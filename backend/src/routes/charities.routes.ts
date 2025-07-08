import express from 'express';
import { getCharityById } from '../controllers/charities.controller';

const router = express.Router();

// GET /api/charities/:id
router.get('/:id', getCharityById);

export default router;
