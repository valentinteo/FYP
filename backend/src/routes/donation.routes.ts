import { Router } from 'express';
import { getAllDonations } from '../controllers/donation.controller';

const router = Router();

router.get('/', getAllDonations);

export default router;