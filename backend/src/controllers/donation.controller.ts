import { Request, Response } from 'express';
import Donation from '../models/donation.model';

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};