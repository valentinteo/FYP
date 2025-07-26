import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';

const NetsQrPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);

  const cartTotal = location.state?.cartTotal;

  useEffect(() => {
    const fetchQr = async () => {
      if (!cartTotal) {
        navigate('/cart');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/generateNETSQR', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartTotal }),
        });

        const data = await res.json();

        if (data.success && data.qrData?.qrCodeUrl && data.qrData?.txnRetrievalRef) {
          setQrData(data.qrData);
        } else {
          console.warn('❌ QR not generated, redirecting to /fail');
          navigate('/payment/nets-qr/fail');
        }
      } catch (err) {
        console.error('❌ Backend error:', err);
        navigate('/payment/nets-qr/fail');
      }
    };

    fetchQr();
  }, [cartTotal, navigate]);

  useEffect(() => {
    if (!qrData) return;

    const { txnRetrievalRef, webhookUrl, apiKey, projectId } = qrData;
    const url = `${webhookUrl}?txn_retrieval_ref=${txnRetrievalRef}`;

    const sse = new EventSourcePolyfill(url, {
      headers: {
        'api-key': apiKey,
        'project-id': projectId,
      },
      heartbeatTimeout: 150000,
    });

    sse.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 SSE event:', data);

      if (data.message === 'QR code scanned') {
        sse.close();
        navigate('/payment/nets-qr/success');
      } else if (data.message === 'Timeout') {
        sse.close();
        navigate('/payment/nets-qr/fail');
      }
    });

    let timeLeft = 180;
    const timer = document.getElementById('timer');

    const tick = () => {
      const mins = Math.floor(timeLeft / 60);
      const secs = String(timeLeft % 60).padStart(2, '0');
      if (timer) timer.textContent = `⏳ Time remaining: ${mins}:${secs}`;
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(interval);
        if (timer) timer.textContent = '❌ Transaction timed out';
        sse.close();
        navigate('/payment/nets-qr/fail');
      }
    };

    const interval = setInterval(tick, 1000);
    tick();

    return () => {
      sse.close();
      clearInterval(interval);
    };
  }, [qrData, navigate]);

  if (!qrData) {
    return <p>⏳ Generating your QR code...</p>;
  }

  return (
    <div>
      <h1>Scan the NETS QR Code</h1>
      <p>Use your bank app simulator to scan and complete payment</p>
      <img src={qrData.qrCodeUrl} alt="QR Code" />
      <p id="timer">⏳ Time remaining: 3:00</p>
      <img src={`http://localhost:5000/uploads/netsQrInfo.png`} alt="NETS QR Info" width="40%"/>
      <br />
      <a href="/cart">Cancel</a>
    </div>
  );
};

export default NetsQrPage;
