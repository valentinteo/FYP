import { Router } from 'express';
import { getAllDonations, addDonation } from '../controllers/donation.controller';

const router = Router();

router.get('/', getAllDonations);
router.post('/', addDonation); // ✅ make sure this exists

export default router;