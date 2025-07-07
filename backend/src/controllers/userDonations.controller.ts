// import { Request, Response } from 'express';
// import { Sequelize } from 'sequelize';
// import Donation from '../models/donation.model';
// import User from '../models/user.model';
// import Charity from '../models/charity.model';

// export const getUserDonations = async (req: Request, res: Response) => {
//   try {
//     const donations = await Donation.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['user_name'],
//         },
//         {
//           model: Charity,
//           attributes: ['charity_name'],
//         },
//       ],
//       attributes: [
//         ['donation_amount', 'amount'],
//         ['donation_created_datetime', 'date'],
//         ['donation_mode', 'payment_method'],
//       ],
//       order: [['donation_created_datetime', 'DESC']],
//     });

//     const formatted = donations.map((donation: any) => ({
//       name: donation.User?.user_name || '',
//       amount: donation.get('amount'),
//       date: donation.get('date')?.toISOString().split('T')[0], // format as yyyy-MM-dd
//       campaign: donation.Charity?.charity_name || '',
//       payment_method: donation.get('payment_method'),
//     }));

//     res.status(200).json(formatted);
//   } catch (err) {
//     console.error('❌ Error fetching user donations:', err);
//     res.status(500).json({ message: 'Failed to retrieve user donations.' });
//   }
// };


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

