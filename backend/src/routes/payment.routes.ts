import { Router, Request, Response } from 'express';
import { generateQrCode } from '../controllers/payment.controller';

const router = Router();

// ✅ POST: Generate NETS QR
router.post('/generateNETSQR', generateQrCode);

// ✅ GET: Success page
router.get('/nets-qr/success', (req: Request, res: Response) => {
  res.render('netsTxnSuccessStatus', {
    message: 'Transaction Successful!',
  });
});

// ✅ GET: Failure page
router.get('/nets-qr/fail', (req: Request, res: Response) => {
  res.render('netsTxnFailStatus', {
    message: 'Transaction Failed. Please try again.',
  });
});

export default router;
