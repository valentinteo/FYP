import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import Charity from '../models/charity.model';
import Fundraising from '../models/fundraising.model';
import { Sequelize } from 'sequelize';


export const PieChart = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

export const BarChart = async (req: Request, res: Response) => {
  try {
    const results = await Donation.findAll({
      attributes: [
        [Sequelize.col('charity.charity_name'), 'charity_name'],
        [Sequelize.fn('SUM', Sequelize.col('donation_amount')), 'total_donated']
      ],
      include: [{
        model: Charity,
        attributes: []
      }],
      group: ['charity.charity_name']
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation summary' });
  }
};

export const TotalDonationsCollected = async (req: Request, res: Response) => {
  try {
    const result = await Donation.findAll({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('donation_amount')), 'total_donations']]
    });

    res.json(result[0]); // returns { total_donations: ... }
  } catch (err) {
    console.error('Failed to fetch total donations:', err);
    res.status(500).json({ error: 'Failed to fetch total donations' });
  }
};

export const TotalDonors = async (req: Request, res: Response) => {
  try {
    const result = await Donation.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('donation_user_id'))), 'total_donors']]
    });
    res.json(result[0]);
  } catch (err) {
    console.error('Failed to fetch total donors:', err);
    res.status(500).json({ error: 'Failed to fetch total donors' });
  }
};

export const FundraisingProgress = async (req: Request, res: Response) => {
  try {
    // Get total fundraising goal
    const fundraising = await Fundraising.findOne({
      attributes: ['fundraising_goal_amount']
    });

    // Get total donations
    const donations = await Donation.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('donation_amount')), 'total_donations']
      ]
    });

    const goal = fundraising?.fundraising_goal_amount || 0;
    const total = donations[0]?.dataValues?.total_donations || 0;

    const progress = goal > 0 ? ((total / goal) * 100).toFixed(1) : '0';

    res.json({ progress: `${progress}%` });
  } catch (err) {
    console.error('Error fetching fundraising progress:', err);
    res.status(500).json({ error: 'Failed to fetch fundraising progress' });
  }
};