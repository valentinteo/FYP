import { Router } from 'express';
import { BarChart, PieChart, TotalDonationsCollected, TotalDonors, FundraisingProgress } from '../controllers/dashboard.controller';

const router = Router();


router.get('/donations/charity-summary', BarChart);
router.get('/donationMode', PieChart)
router.get('/donations/total', TotalDonationsCollected); 
router.get('/donations/donors', TotalDonors);
router.get('/fundraising/progress', FundraisingProgress);


export default router;
