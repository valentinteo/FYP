// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// export const getAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.findAll();
//     res.json(admins);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch admins' });
//   }
// };

// export const addAdmin = async (req: Request, res: Response) => {
//   try {
//     const admin = await Admin.create(req.body);
//     res.status(201).json(admin);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add admin' });
//   }
// };

// export const deleteAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.destroy({ where: { admin_user_id: id } });
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete admin' });
//   }
// };

// export const updateAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.update(req.body, { where: { admin_user_id: id } });
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update admin' });
//   }
// };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// // ✅ Get all admins
// export const getAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.findAll();
//     res.json(admins);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch admins' });
//   }
// };

// // ✅ Add a new admin (defaults to unapproved unless set)
// export const addAdmin = async (req: Request, res: Response) => {
//   try {
//     const admin = await Admin.create({
//       ...req.body,
//       is_approved: req.body.is_approved ?? false
//     });
//     res.status(201).json(admin);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add admin' });
//   }
// };

// // ✅ Delete an admin by ID
// export const deleteAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.destroy({ where: { admin_user_id: id } });
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete admin' });
//   }
// };

// // ✅ Update an admin by ID
// export const updateAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.update(req.body, { where: { admin_user_id: id } });
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update admin' });
//   }
// };

// // ✅ Get all unapproved admins
// export const getUnapprovedAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.findAll({ where: { is_approved: false } });
//     res.json(admins);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch unapproved admins' });
//   }
// };

// // ✅ Approve a specific admin by ID
// export const approveAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.update({ is_approved: true }, { where: { admin_user_id: id } });
//     res.status(200).json({ message: 'Admin approved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to approve admin' });
//   }
// };

// import { Request, Response } from 'express';
// import Admin from '../models/admin.model';

// // ✅ Get all admins
// export const getAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.findAll();
//     res.json(admins);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch admins' });
//   }
// };

// // ✅ Add a new admin (defaults to unapproved unless set)
// export const addAdmin = async (req: Request, res: Response) => {
//   try {
//     const admin = await Admin.create({
//       ...req.body,
//       is_approved: req.body.is_approved ?? false
//     });
//     res.status(201).json(admin);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add admin' });
//   }
// };

// // ✅ Delete an admin by ID
// export const deleteAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.destroy({ where: { admin_user_id: id } });
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete admin' });
//   }
// };

// // ✅ Update an admin by ID
// export const updateAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.update(req.body, { where: { admin_user_id: id } });
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update admin' });
//   }
// };

// // ✅ Get all unapproved admins
// export const getUnapprovedAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.findAll({ where: { is_approved: false } });
//     res.json(admins);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch unapproved admins' });
//   }
// };

// // ✅ Approve a specific admin by ID
// export const approveAdmin = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await Admin.update({ is_approved: true }, { where: { admin_user_id: id } });
//     res.status(200).json({ message: 'Admin approved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to approve admin' });
//   }
// };

// // ✅ Reset admin password by email
// export const resetAdminPassword = async (req: Request, res: Response) => {
//   try {
//     const { email, newPassword } = req.body;

//     const admin = await Admin.findOne({ where: { admin_email: email } });
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     await Admin.update({ admin_password: newPassword }, { where: { admin_email: email } });
//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

import { Request, Response } from 'express';
import Admin from '../models/admin.model';

// ✅ Get all admins
export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};

// ✅ Add a new admin (defaults to unapproved unless set)
export const addAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.create({
      ...req.body,
      is_approved: req.body.is_approved ?? false
    });
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add admin' });
  }
};

// ✅ Delete an admin by ID
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { admin_user_id: id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};

// ✅ Update an admin by ID
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Admin.update(req.body, { where: { admin_user_id: id } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
};

// ✅ Get all unapproved admins
export const getUnapprovedAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.findAll({ where: { is_approved: false } });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch unapproved admins' });
  }
};

// ✅ Approve a specific admin by ID
export const approveAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Admin.update({ is_approved: true }, { where: { admin_user_id: id } });
    res.status(200).json({ message: 'Admin approved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve admin' });
  }
};

// ✅ Reject a specific admin by ID
export const rejectAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await admin.destroy();
    res.status(200).json({ message: 'Admin rejected and deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject admin' });
  }
};

// ✅ Reset admin password by email
export const resetAdminPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    const admin = await Admin.findOne({ where: { admin_email: email } });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    await Admin.update({ admin_password: newPassword }, { where: { admin_email: email } });
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};
