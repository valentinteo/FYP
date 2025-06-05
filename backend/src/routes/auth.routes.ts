// import { Router } from 'express';
// import { loginUser } from '../controllers/auth.controller';

// const router = Router();

// router.post('/login', loginUser);

// export default router;

import { Router } from 'express';
import { loginUser, signupAdmin } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginUser);
router.post('/signup', signupAdmin); // ✅ Now handled by Admin model

export default router;
