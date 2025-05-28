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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
