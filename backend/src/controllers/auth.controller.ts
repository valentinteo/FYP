import { Request, Response } from 'express';
import Admin from '../models/admin.model'; // ✅ changed from User to Admin

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
