import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import User from '../models/user.model';
import Charity from '../models/charity.model';

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll({
      attributes: ['donation_created_datetime', 'donation_amount'],
      include: [
        {
          model: User,
          attributes: ['user_name', 'user_email']
        },
        {
          model: Charity,
          attributes: ['charity_name']
        }
      ],
      order: [['donation_created_datetime', 'DESC']]
    });

    const formatted = donations.map((donation: any) => ({
      date: donation.donation_created_datetime,
      name: donation.user?.user_name,
      email: donation.user?.user_email,
      charity: donation.charity?.charity_name,
      amount: donation.donation_amount
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};