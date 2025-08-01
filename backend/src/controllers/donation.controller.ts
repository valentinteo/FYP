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


// donation.controller.ts
export const addDonation = async (req: Request, res: Response) => {
  const user = req.session.user;
  if (!user || !user.id) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const {
      donation_order_id,
      donation_charity_id,
      donation_amount,
      donation_mode,
      donation_is_tax_deductible,
      donation_tax_deductible_amount,
    } = req.body;

    const newDonation = await Donation.create({
      donation_user_id: user.id,
      donation_order_id: donation_order_id ?? null,
      donation_charity_id,
      donation_amount,
      donation_mode,
      donation_created_datetime: new Date(),
      donation_is_tax_deductible,
      donation_tax_deductible_amount,
    });

    return res.status(201).json(newDonation);
  } catch (error) {
    console.error('❌ Failed to create donation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
