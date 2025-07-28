import { Router } from 'express';
import { BarChart, PieChart, TotalDonationsCollected, TotalDonors, getFundraisingProgress, getOngoingFundraising, updateFundraising, addFundraising, deleteFundraising } from '../controllers/dashboard.controller';

const router = Router();


router.get('/donations/charity-summary', BarChart);
router.get('/donationMode', PieChart)
router.get('/donations/total', TotalDonationsCollected); 
router.get('/donations/donors', TotalDonors);
// router.get('/fundraising/progress', FundraisingProgress);
router.get('/fundraising/progress', getFundraisingProgress);
router.get('/fundraising/ongoing', getOngoingFundraising);
router.put('/fundraising/update', updateFundraising);
router.post('/fundraising/add', addFundraising);
router.delete('/fundraising/:id', deleteFundraising);

export default router;
