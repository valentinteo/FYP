// import { Router } from 'express';
// import { getAdmins, addAdmin, deleteAdmin, updateAdmin } from '../controllers/admin.controller';

// const router = Router();

// router.get('/', getAdmins);
// router.post('/', addAdmin);
// router.delete('/:id', deleteAdmin);
// router.put('/:id', updateAdmin);

// export default router;

// import { Router } from 'express';
// import {
//   getAdmins,
//   addAdmin,
//   deleteAdmin,
//   updateAdmin,
//   getUnapprovedAdmins,
//   approveAdmin
// } from '../controllers/admin.controller';

// const router = Router();

// router.get('/', getAdmins);
// router.post('/', addAdmin);
// router.delete('/:id', deleteAdmin);
// router.put('/:id', updateAdmin);

// // ✅ New routes for super admin approval
// router.get('/pending', getUnapprovedAdmins);
// router.put('/approve/:id', approveAdmin);

// export default router;

// import { Router } from 'express';
// import {
//   getAdmins,
//   addAdmin,
//   deleteAdmin,
//   updateAdmin,
//   getUnapprovedAdmins,
//   approveAdmin
// } from '../controllers/admin.controller';

// import { resetAdminPassword } from '../controllers/auth.controller'; // ✅ NEW import

// const router = Router();

// router.get('/', getAdmins);
// router.post('/', addAdmin);
// router.delete('/:id', deleteAdmin);
// router.put('/:id', updateAdmin);

// // ✅ New routes for super admin approval
// router.get('/pending', getUnapprovedAdmins);
// router.put('/approve/:id', approveAdmin);

// // ✅ New route for admin password reset
// router.post('/reset-password', resetAdminPassword);

// export default router;

import { Router } from 'express';
import {
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getUnapprovedAdmins,
  approveAdmin,
  rejectAdmin // ✅ NEW
} from '../controllers/admin.controller';

import { resetAdminPassword } from '../controllers/auth.controller'; // ✅ Existing

const router = Router();

router.get('/', getAdmins);
router.post('/', addAdmin);
router.delete('/:id', deleteAdmin);
router.put('/:id', updateAdmin);

// ✅ Routes for super admin approval
router.get('/pending', getUnapprovedAdmins);
router.put('/approve/:id', approveAdmin);
router.delete('/reject/:id', rejectAdmin); // ✅ NEW Reject route

// ✅ Route for admin password reset
router.post('/reset-password', resetAdminPassword);

export default router;
