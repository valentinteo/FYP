import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import  Charity  from '../models/charity.model';
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