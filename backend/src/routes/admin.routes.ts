import { Router } from 'express';
import { getAdmins, addAdmin, deleteAdmin, updateAdmin } from '../controllers/admin.controller';

const router = Router();

router.get('/', getAdmins);
router.post('/', addAdmin);
router.delete('/:id', deleteAdmin);
router.put('/:id', updateAdmin);

export default router;
