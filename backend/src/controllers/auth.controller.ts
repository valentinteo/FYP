// // // import { Request, Response } from 'express';
// // // import Admin from '../models/admin.model'; // ✅ changed from User to Admin

// // // export const loginUser = async (req: Request, res: Response) => {
// // //   const { admin_email, admin_password } = req.body;

// // //   try {
// // //     const admin = await Admin.findOne({ where: { admin_email } });
// // //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// // //     if (admin.admin_password !== admin_password) {
// // //       return res.status(401).json({ error: 'Invalid email or password' });
// // //     }

// // //     res.json({ message: 'Login successful', admin });
// // //   } catch (error) {
// // //     res.status(500).json({ error: 'Login failed' });
// // //   }
// // // };

// // import { Request, Response } from 'express';
// // import Admin from '../models/admin.model';

// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email } });
// //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     res.json({ message: 'Login successful', admin });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Login failed' });
// //   }
// // };

// // export const signupAdmin = async (req: Request, res: Response) => {
// //   const {
// //     admin_name,
// //     admin_email,
// //     admin_phone,
// //     admin_password
// //   } = req.body;

// //   try {
// //     const existing = await Admin.findOne({ where: { admin_email } });
// //     if (existing) return res.status(409).json({ error: 'Email already exists' });

// //     const newAdmin = await Admin.create({
// //       admin_name,
// //       admin_email,
// //       admin_phone,
// //       admin_password,
// //       admin_role: 'admin',
// //       admin_created_date_time: new Date()
// //     });

// //     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
// //   } catch (error) {
// //     console.error('Signup error:', error);
// //     res.status(500).json({ error: 'Signup failed' });
// //   }
// // };

// // import { Request, Response } from 'express';
// // import Admin from '../models/admin.model';

// // export const loginUser = async (req: Request, res: Response) => {
// //   const { admin_email, admin_password } = req.body;

// //   try {
// //     const admin = await Admin.findOne({ where: { admin_email } });
// //     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

// //     if (admin.admin_password !== admin_password) {
// //       return res.status(401).json({ error: 'Invalid email or password' });
// //     }

// //     // ✅ Return only necessary fields (flattened, not wrapped in 'admin')
// //     res.json({
// //       message: 'Login successful',
// //       admin_user_id: admin.admin_user_id,
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_role: admin.admin_role,
// //       is_approved: admin.is_approved
// //     });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Login failed' });
// //   }
// // };

// // export const signupAdmin = async (req: Request, res: Response) => {
// //   const {
// //     admin_name,
// //     admin_email,
// //     admin_phone,
// //     admin_password
// //   } = req.body;

// //   try {
// //     const existing = await Admin.findOne({ where: { admin_email } });
// //     if (existing) return res.status(409).json({ error: 'Email already exists' });

// //     const newAdmin = await Admin.create({
// //       admin_name,
// //       admin_email,
// //       admin_phone,
// //       admin_password,
// //       admin_role: 'admin',
// //       admin_created_date_time: new Date(),
// //       is_approved: false // ✅ add this if you're using it
// //     });

// //     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
// //   } catch (error) {
// //     console.error('Signup error:', error);
// //     res.status(500).json({ error: 'Signup failed' });
// //   }
// // };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// // ✅ Login controller
// export const loginUser = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });
//     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

//     if (admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful',
//       admin_user_id: admin.admin_user_id,
//       admin_name: admin.admin_name,
//       admin_email: admin.admin_email,
//       admin_phone: admin.admin_phone,
//       admin_role: admin.admin_role,
//       is_approved: admin.is_approved
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

// // ✅ Signup controller
// export const signupAdmin = async (req: Request, res: Response) => {
//   const {
//     admin_name,
//     admin_email,
//     admin_phone,
//     admin_password
//   } = req.body;

//   try {
//     const existing = await Admin.findOne({ where: { admin_email } });
//     if (existing) return res.status(409).json({ error: 'Email already exists' });

//     const newAdmin = await Admin.create({
//       admin_name,
//       admin_email,
//       admin_phone,
//       admin_password,
//       admin_role: 'admin',
//       admin_created_date_time: new Date(),
//       is_approved: false
//     });

//     res.status(201).json({ message: 'Signup successful', admin: newAdmin });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Signup failed' });
//   }
// };

// // ✅ Reset password controller
// export const resetAdminPassword = async (req: Request, res: Response) => {
//   const { admin_email, new_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     admin.admin_password = new_password;
//     await admin.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

import { Request, Response } from 'express';
import Admin from '../models/admin.model';

// ✅ Login controller
export const loginUser = async (req: Request, res: Response) => {
  const { admin_email, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { admin_email } });
    if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

    if (admin.admin_password !== admin_password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      admin_user_id: admin.admin_user_id,
      admin_name: admin.admin_name,
      admin_email: admin.admin_email,
      admin_phone: admin.admin_phone,
      admin_role: admin.admin_role,
      is_approved: admin.is_approved
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Signup controller
export const signupAdmin = async (req: Request, res: Response) => {
  const {
    admin_name,
    admin_email,
    admin_phone,
    admin_password
  } = req.body;

  try {
    const existing = await Admin.findOne({ where: { admin_email } });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const newAdmin = await Admin.create({
      admin_name,
      admin_email,
      admin_phone,
      admin_password,
      admin_role: 'admin',
      admin_created_date_time: new Date(),
      is_approved: false
    });

    res.status(201).json({ message: 'Signup successful', admin: newAdmin });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// ✅ Reset password controller
export const resetAdminPassword = async (req: Request, res: Response) => {
  const { admin_email, new_password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { admin_email } });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    admin.admin_password = new_password;
    await admin.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// ✅ Get currently logged-in admin using email + password (for DB-only auth)
export const getCurrentAdmin = async (req: Request, res: Response) => {
  const { admin_email, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { admin_email } });

    if (!admin || admin.admin_password !== admin_password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({
      admin_user_id: admin.admin_user_id,
      admin_name: admin.admin_name,
      admin_email: admin.admin_email,
      admin_phone: admin.admin_phone,
      admin_role: admin.admin_role,
      is_approved: admin.is_approved
    });
  } catch (error) {
    console.error('Get current admin error:', error);
    res.status(500).json({ error: 'Failed to fetch admin info' });
  }
};
