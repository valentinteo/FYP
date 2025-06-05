import { Request, Response } from 'express';
import Admin from '../models/admin.model';

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add admin' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { admin_user_id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Admin.update(req.body, { where: { admin_user_id: id } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
};
