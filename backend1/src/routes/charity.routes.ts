import { Router } from 'express';
import {getCharities, addCharity, updateCharity, deleteCharity} from '../controllers/charity.controller';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

router.get('/', getCharities);
router.post('/', uploadMiddleware, addCharity);
router.put('/:id', uploadMiddleware, updateCharity);
router.delete('/:id', deleteCharity);

export default router;
