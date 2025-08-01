// import { Router } from 'express';
// import { loginUser } from '../controllers/auth.controller';

// const router = Router();

// router.post('/login', loginUser);

// export default router;

import { Router } from 'express';
import { loginUser, signupAdmin, resetAdminPassword, getCurrentAdmin} from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginUser);
router.post('/signup', signupAdmin); // ✅ Now handled by Admin model
router.put('/reset-password', resetAdminPassword); // ✅ Add this line
router.post('/me', getCurrentAdmin);
router.get('/getCurrentAdmin', getCurrentAdmin);


export default router;
