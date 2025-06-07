import express from 'express';
import { getTaxDeductionSummary } from '../controllers/taxDeduction.controller';

const router = express.Router();

router.get('/tax-deduction', getTaxDeductionSummary);

export default router;
