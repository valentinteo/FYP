const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db'); // use the promise-based DB
const app = express();
const multer = require('multer');
const path = require('path');
app.use(cors());
app.use(express.json());


// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, '-'); // 🔧 remove spaces
    const filename = Date.now() + '-' + cleanName;
    cb(null, filename);
  }
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));


// Route: Get donations
app.get('/api/donations', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM donation');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get admin users
app.get('/api/admin', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM admin');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Add new admin
app.post('/api/admin', async (req, res) => {
  const { admin_name, admin_email, admin_phone, admin_password, admin_role } = req.body;

  const sql = `
    INSERT INTO admin (
      admin_name, admin_email, admin_phone, admin_password, admin_role, admin_created_date_time, admin_last_login
    ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  try {
    const [result] = await db.query(sql, [admin_name, admin_email, admin_phone, admin_password, admin_role]);
    res.status(201).json({ message: 'Admin created successfully', id: result.insertId });
  } catch (err) {
    console.error('Failed to insert admin:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route: Get charities
app.get('/api/charities', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM charity');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/charities', upload.single('charity_image'), async (req, res) => {
  try {
    const { charity_name, charity_description, charity_UEN } = req.body;
    const charity_image = req.file ? req.file.filename : '';

    const [result] = await db.query(
      'INSERT INTO charity (charity_name, charity_description, charity_UEN, charity_image) VALUES (?, ?, ?, ?)',
      [charity_name, charity_description, charity_UEN, charity_image]
    );

    res.status(201).json({ message: 'Charity added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding charity:', error);  // 🔍 Make sure this is visible
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/charities/:id', upload.single('charity_image'), async (req, res) => {
  const { id } = req.params;
  const { charity_name, charity_description, charity_UEN } = req.body;
  const charity_image = req.file ? req.file.filename : null;

  try {
    let sql = 'UPDATE charity SET charity_name = ?, charity_description = ?, charity_UEN = ?';
    const params = [charity_name, charity_description, charity_UEN];

    if (charity_image) {
      sql += ', charity_image = ?';
      params.push(charity_image);
    }

    sql += ' WHERE charity_id = ?';
    params.push(id);

    const [result] = await db.query(sql, params);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update charity' });
  }
});


app.delete('/api/charities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM charity WHERE charity_id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete charity' });
  }
});



// Route: Tax deduction data
app.get('/api/tax-deduction', async (req, res) => {
  const query = `
    SELECT 
      u.user_name,
      c.charity_name,
      d.donation_id,
      d.donation_amount,
      d.donation_created_datetime
    FROM donation d
    JOIN user u ON d.donation_user_id = u.user_id
    JOIN charity c ON d.donation_charity_id = c.charity_id
    ORDER BY d.donation_created_datetime DESC
  `;

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
