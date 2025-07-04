import { Request, Response } from 'express';
import { sqlServerDb } from '../database/connection';

export const getUserDonations = async (req: Request, res: Response) => {
  try {
    const [results] = await sqlServerDb.query(`
      SELECT 
        u.user_name AS name,
        d.donation_amount AS amount,
        FORMAT(d.donation_created_datetime, 'yyyy-MM-dd') AS date,
        c.charity_name AS campaign,
        d.donation_mode AS payment_method
      FROM donation d
      LEFT JOIN [user] u ON d.donation_user_id = u.user_id
      LEFT JOIN charity c ON d.donation_charity_id = c.charity_id
      ORDER BY d.donation_created_datetime DESC
    `);

    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error fetching user donations:', err);
    res.status(500).json({ message: 'Failed to retrieve user donations.' });
  }
};


