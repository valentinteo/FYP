import { Request, Response } from 'express';
import User from '../models/user.model';

export const loginUser = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { user_email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    if (user.user_password !== user_password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
