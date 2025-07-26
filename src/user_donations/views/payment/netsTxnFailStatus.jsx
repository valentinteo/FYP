import React from 'react';

const TransactionFailPage = ({ message = "Transaction Failed" }) => {
  return (
    <div className="container">
      <h1>{message}</h1>
      <p>Please try again later.</p>

      <div className="netsQrPaymentGatewayWebpage">
        <div className="netsQrTxnFailStatus">
          <img
            src={`http://localhost:5000/uploads/redCross.png`}
            alt="Transaction Fail"
            style={{ width: '20%', height: 'auto' }}
          />
          <h2 className="text">TRANSACTION FAILED</h2>
          <div className="button" id="btnFail"></div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFailPage;
