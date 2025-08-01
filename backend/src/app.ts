import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect_db, sqlServerDb } from './database/connection';
import session from 'express-session';
import charityRoutes from './routes/charity.routes';
import donationRoutes from './routes/donation.routes';
import dashboardRoutes from './routes/dashboard.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import taxDeductionRoutes from './routes/taxDeduction.routes';
import userDonationsRoutes from './routes/userDonations.routes';
import charitiesRoutes from './routes/charities.routes';
import cartRoutes from './routes/cart.routes';
import paymentRoutes from './routes/payment.routes';


dotenv.config();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,         
    httpOnly: true,
    sameSite: 'lax'        
  }
}));


app.use((req, res, next) => {
  // console.log('📦 Session content:', req.session);
  next();
});

// ✅ API routes
app.use('/api/charities', charityRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/donations/charity-summary', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', taxDeductionRoutes);
app.use('/api/user-donations', userDonationsRoutes);
app.use('/api/charities', charitiesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', paymentRoutes); 
app.use('/api/donation', donationRoutes); 

connect_db();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
