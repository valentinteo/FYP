import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to request NETS QR
const requestNetsQR = async (cartTotal: number) => {
  const requestBody = {
    txn_id: 'sandbox_nets|m|8ff8e5b6-d43e-4786-8ac5-7accf8c5bd9b',
    amt_in_dollars: cartTotal,
    notify_mobile: 0
  };

  const response = await axios.post(
    'https://sandbox.nets.openapipaas.com/api/v1/common/payments/nets-qr/request',
    requestBody,
    {
      headers: {
        'api-key': process.env.API_KEY || '',
        'project-id': process.env.PROJECT_ID || ''
      }
    }
  );

  return response.data?.result?.data;
};

// Main controller function
export const generateQrCode = async (req: Request, res: Response): Promise<void> => {
  const { cartTotal } = req.body;
  // console.log('🛒 cartTotal:', cartTotal);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const qrData = await requestNetsQR(cartTotal);
      // console.log(`📦 Attempt ${attempt} QR response:`, qrData);

      if (
        qrData?.response_code === '00' &&
        qrData?.txn_status === 1 &&
        qrData?.qr_code
      ) {
        // console.log(`✅ QR code generated successfully (attempt ${attempt})`);
        res.status(200).json({
          success: true,
          qrData: {
            qrCodeUrl: `data:image/png;base64,${qrData.qr_code}`,
            txnRetrievalRef: qrData.txn_retrieval_ref,
            networkCode: qrData.network_status,
            timer: 300,
            webhookUrl: 'https://sandbox.nets.openapipaas.com/api/v1/common/payments/nets/webhook',
            apiKey: process.env.API_KEY,
            projectId: process.env.PROJECT_ID
          }
        });
        return;
      }
    } catch (err) {
      console.error(`❌ Attempt ${attempt} failed:`, (err as any).message);
    }
  }

  console.warn('⚠️ All attempts to generate QR code failed. No response sent.');
  // Frontend should handle this (e.g. show error after timeout)
};
