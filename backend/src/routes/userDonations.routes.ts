import express from 'express';
import { getUserDonations } from '../controllers/userDonations.controller';

const router = express.Router();

router.get('/', getUserDonations);

export default router;
