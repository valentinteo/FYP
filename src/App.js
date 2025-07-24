import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './login/views/LoginPage';
import SignupPage from './signup/views/SignupPage';
import DashboardPage from './dashboard/views/DashboardPage';
import AdminUsersPage from './admin/views/AdminUsersPage';
import DonationHistoryPage from './donations/views/DonationHistoryPage';
import CharityManagementPage from './charities/views/CharityManagementPage';
import CharityDetailsPage from './user_donations/views/CharityDetailsPage';
import TaxDeductionPage from './tax_deduction/views/TaxDeductionPage'; 
import RequireSuperadmin from './admin/components/RequireSuperadmin';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ForgetPasswordPage from './login/views/ForgetPasswordPage';
import UserDonationsPage from './user_donations/views/UserDonationsPage';
import ApproveAdminsPage from './admin/views/ApproveAdminsPage.jsx'; // ✅ added
import ToastProvider from './common/ToastProvider';
import CartPage from './user_donations/views/CartPage';

function App() {
  return (
    <Router>
      <ToastProvider />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin-users" element={
          <RequireSuperadmin>
            <AdminUsersPage />
          </RequireSuperadmin>
        } />
        <Route path="/admin/approve" element={
          <RequireSuperadmin>
            <ApproveAdminsPage />
          </RequireSuperadmin>
        } />
        <Route path="/donations" element={<DonationHistoryPage />} />
        <Route path="/charity" element={<CharityManagementPage />} />
        <Route path="/charity/:id" element={<CharityDetailsPage />} /> 
        <Route path="/tax-deduction" element={<TaxDeductionPage />} />
        <Route path="/user-donations" element={<UserDonationsPage />} /> 
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
