// import { Request, Response } from 'express';
// import Admin from '../models/admin.model'; // ✅ changed from User to Admin

// export const loginUser = async (req: Request, res: Response) => {
//   const { admin_email, admin_password } = req.body;

//   try {
//     const admin = await Admin.findOne({ where: { admin_email } });
//     if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

//     if (admin.admin_password !== admin_password) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     res.json({ message: 'Login successful', admin });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

import { Request, Response } from 'express';
import Admin from '../models/admin.model';

export const loginUser = async (req: Request, res: Response) => {
  const { admin_email, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { admin_email } });
    if (!admin) return res.status(401).json({ error: 'Invalid email or password' });

    if (admin.admin_password !== admin_password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

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
      admin_created_date_time: new Date()
    });

    res.status(201).json({ message: 'Signup successful', admin: newAdmin });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};
