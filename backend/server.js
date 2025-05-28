const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Example route to get donations
app.get('/api/donations', (req, res) => {
  db.query('SELECT * FROM donation', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Route to get all admin users
app.get('/api/admin', (req, res) => {
  db.query('SELECT * FROM admin', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/admin', (req, res) => {
  const { admin_name, admin_email, admin_phone, admin_password, admin_role } = req.body;

  const sql = `
    INSERT INTO admin (
      admin_name, admin_email, admin_phone, admin_password, admin_role, admin_created_date_time, admin_last_login
    ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  db.query(sql, [admin_name, admin_email, admin_phone, admin_password, admin_role], (err, result) => {
    if (err) {
      console.error('Failed to insert admin:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Admin inserted:', result);
    res.status(201).json({ message: 'Admin created successfully' });
  });
});



// Route to get all charities
app.get('/api/charities', (req, res) => {
  db.query('SELECT * FROM charity', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Route to get simplified tax deduction info
app.get('/api/tax-deduction', (req, res) => {
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

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
