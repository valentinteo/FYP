import { Request, Response } from 'express';
import { sqlServerDb } from '../database/connection';

export const getUserDonations = async (req: Request, res: Response) => {
  try {
    const [results] = await sqlServerDb.query(`
      SELECT *
      FROM charity
      ORDER BY charity_name ASC
    `);

    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error fetching charities:', err);
    res.status(500).json({ message: 'Failed to retrieve charities.' });
  }
};

