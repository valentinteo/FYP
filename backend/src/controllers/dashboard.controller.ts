import { Request, Response } from 'express';
import { Op } from 'sequelize';
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


export const getFundraisingProgress = async (req: Request, res: Response) => {
  try {
    // Get the latest fundraising campaign
    const latestFundraising = await Fundraising.findOne({
      order: [['fundraising_id', 'ASC']],
    });

    if (!latestFundraising) {
      return res.status(404).json({ error: 'No fundraising campaign found' });
    }

    // ✅ Sum all donations in the database
    const totalDonations = await Donation.sum('donation_amount');
    const goal = latestFundraising.fundraising_goal_amount || 0;
    const total = totalDonations || 0;

    // ✅ Calculate overall fundraising progress
    const progress = goal > 0 ? ((total / goal) * 100).toFixed(1) : '0';

    res.json({ progress: `${progress}%` });
  } catch (error) {
    console.error('🔴 Error fetching fundraising progress:', error);
    res.status(500).json({ error: 'Failed to fetch fundraising progress' });
  }
};



// export const getLatestFundraising = async (req: Request, res: Response) => {
//   try {
//     const currentDate = new Date();

//     const ongoing = await Fundraising.findOne({
//       where: {
//         fundraising_start_datetime: { [Op.lte]: currentDate },
//         fundraising_end_datetime: { [Op.gte]: currentDate },
//       },
//       order: [['fundraising_id', 'ASC']], // get the earliest one if multiple
//     });

//     if (!ongoing) {
//       return res.status(404).json({ error: 'No ongoing fundraising campaign found' });
//     }

//     res.json(ongoing);
//   } catch (error) {
//     console.error('Error fetching ongoing fundraising:', error);
//     res.status(500).json({ error: 'Failed to fetch fundraising data' });
//   }
// };


export const getOngoingFundraising = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();

    const ongoingCampaigns = await Fundraising.findAll({
      where: {
        fundraising_start_datetime: { [Op.lte]: currentDate },
        fundraising_end_datetime: { [Op.gte]: currentDate },
      },
      order: [['fundraising_id', 'ASC']], // optional: sorted by earliest created
    });

    if (ongoingCampaigns.length === 0) {
      return res.status(404).json({ error: 'No ongoing fundraising campaigns found' });
    }

    res.json(ongoingCampaigns);
  } catch (error) {
    console.error('Error fetching ongoing fundraising campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch fundraising data' });
  }
};



export const updateFundraising = async (req: Request, res: Response) => {
  try {
    const { fundraising_id, ...updateFields } = req.body;

    if (!fundraising_id) {
      return res.status(400).json({ error: 'Missing fundraising_id' });
    }

    const [updated] = await Fundraising.update(updateFields, {
      where: { fundraising_id },
    });

    if (!updated) {
      return res.status(404).json({ error: 'Fundraising not found or unchanged' });
    }

    res.json({ message: 'Fundraising updated successfully' });
  } catch (error) {
    console.error('Error updating fundraising:', error);
    res.status(500).json({ error: 'Failed to update fundraising' });
  }
};


export const addFundraising = async (req: Request, res: Response) => {
  try {
    const {
      fundraising_charity_id,
      fundraising_title,
      fundraising_description,
      fundraising_goal_amount,
      fundraising_start_datetime,
      fundraising_end_datetime,
    } = req.body;

    const newFundraising = await Fundraising.create({
      fundraising_charity_id,
      fundraising_title,
      fundraising_description,
      fundraising_goal_amount,
      fundraising_start_datetime,
      fundraising_end_datetime,
    });

    res.status(201).json(newFundraising);
  } catch (err) {
    console.error('Failed to add fundraising:', err);
    res.status(500).json({ error: 'Failed to add fundraising' });
  }
};


// fundraising.controller.ts
export const deleteFundraising = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Fundraising.destroy({ where: { fundraising_id: id } });
    res.json({ message: 'Fundraising deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete fundraising.' });
  }
};
