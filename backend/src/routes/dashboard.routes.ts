import { Router } from 'express';
import { BarChart, PieChart, TotalDonationsCollected } from '../controllers/dashboard.controller';

const router = Router();


router.get('/donations/charity-summary', BarChart);
router.get('/donationMode', PieChart)
router.get('/donations/total', TotalDonationsCollected); 

export default router;
