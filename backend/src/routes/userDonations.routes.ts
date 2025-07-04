import { Router } from 'express';
import { getUserDonations } from '../controllers/userDonations.controller';

const router = Router();

router.get('/', getUserDonations);

export default router;
