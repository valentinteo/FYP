import { Request, Response } from 'express';
import { sqlServerDb } from '../database/connection';
import { QueryTypes } from 'sequelize'; // ✅ Import this

export const getCharityById = async (req: Request, res: Response) => {
  const charityId = req.params.id;

  try {
    const results = await sqlServerDb.query(
      `
        SELECT *
        FROM charity
        WHERE charity_id = :charityId
      `,
      {
        replacements: { charityId },
        type: QueryTypes.SELECT, // ✅ Use imported QueryTypes
      }
    );

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'Charity not found.' });
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error('❌ Error fetching charity by ID:', err);
    res.status(500).json({ message: 'Failed to retrieve charity.' });
  }
};
