import { Request as ExpressRequest, Response } from 'express';
import Charity from '../models/charity.model';
import { sendCharityNotification } from '../utils/email';
import User from '../models/user.model'; // Assuming user model is here



interface MulterRequest extends ExpressRequest {
  file?: Express.Multer.File;
}

export const getCharities = async (_req: ExpressRequest, res: Response) => {
  try {
    const charities = await Charity.findAll();
    res.json(charities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch charities' });
  }
};



export const addCharity = async (req: MulterRequest, res: Response) => {
  try {
    const { charity_name, charity_description, charity_UEN } = req.body;
    const imagePath = req.file ? req.file.filename : '';

    const newCharity = await Charity.create({
      charity_name,
      charity_description,
      charity_UEN,
      charity_image: imagePath,
      is_charity_featured: false,
    });

    // Fetch all user emails
    const users = await User.findAll();
    const emails = users.map((user) => user.user_email); // adjust field if needed

    // Send email notification
    await sendCharityNotification(emails, charity_name);

    res.status(201).json(newCharity);
  } catch (err: any) {
    console.error('🔥 Error while adding charity:', err);

    res.status(500).json({
      error: 'Failed to add charity',
      details: err.message || err.toString(),
    });
  }
};




export const updateCharity = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { charity_name, charity_description, charity_UEN, is_charity_featured } = req.body;

    const imagePath = req.file ? req.file.filename : undefined;

    const charity = await Charity.findByPk(id);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    charity.charity_name = charity_name;
    charity.charity_description = charity_description;
    charity.charity_UEN = charity_UEN;
    if (imagePath) charity.charity_image = imagePath;
    charity.is_charity_featured = is_charity_featured === '1' || is_charity_featured === 'true';

    if (imagePath) {
      charity.charity_image = imagePath;
    }

    await charity.save();
    res.json(charity);
  } catch (err: any) {
    console.error('🔥 Error while updating charity:', err);
    res.status(500).json({
      error: 'Failed to update charity',
      details: err.message || err.toString(),
    });
  }
};


export const deleteCharity = async (req: ExpressRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Charity.destroy({ where: { charity_id: id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    res.json({ message: 'Charity deleted successfully' });
  } catch (err: any) {
    console.error('🔥 Error while deleting charity:', err);
    res.status(500).json({
      error: 'Failed to delete charity',
      details: err.message || err.toString(),
    });
  }
};
