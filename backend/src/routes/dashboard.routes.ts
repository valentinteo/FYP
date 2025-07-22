import { Router } from 'express';
import { BarChart, PieChart, TotalDonationsCollected, TotalDonors, getFundraisingProgress, getLatestFundraising, updateFundraising, } from '../controllers/dashboard.controller';

const router = Router();


router.get('/donations/charity-summary', BarChart);
router.get('/donationMode', PieChart)
router.get('/donations/total', TotalDonationsCollected); 
router.get('/donations/donors', TotalDonors);
// router.get('/fundraising/progress', FundraisingProgress);
router.get('/fundraising/progress', getFundraisingProgress);
router.get('/fundraising/latest', getLatestFundraising);
router.put('/fundraising/update', updateFundraising);

export default router;
