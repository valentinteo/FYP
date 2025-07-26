import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import User from '../models/user.model';
import Charity from '../models/charity.model';

export const getTaxDeductionSummary = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll({
      include: [
        { model: User, attributes: ['user_name'] },
        { model: Charity, attributes: ['charity_name'] }
      ],
      attributes: [
        'donation_id',
        'donation_created_datetime',
        'donation_amount',
        'donation_user_id'
      ],
      raw: true,
      nest: true
    });

    // Aggregate total donations per user
    const userTotals: { [userId: number]: number } = {};
    donations.forEach(d => {
      const userId = d.donation_user_id;
      userTotals[userId] = (userTotals[userId] || 0) + + d.donation_amount;
    });

    // Enrich each donation record with eligibility
    const summary = donations.map(donation => {
      const total = userTotals[donation.donation_user_id];
      const isEligible = total > 100;

      return {
        donation_id: donation.donation_id,
        date: donation.donation_created_datetime,
        charity_name: donation.charity?.charity_name || '',
        donation_amount: donation.donation_amount,
        user: donation.user?.user_name || '',
        eligibility: isEligible ? 'Eligible' : 'Not Eligible',
        total_donated: total
      };
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching tax deduction summary:', error);
    res.status(500).json({ error: 'Failed to fetch tax deduction summary' });
  }
};
