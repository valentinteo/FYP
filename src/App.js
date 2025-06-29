import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './login/views/LoginPage';
import SignupPage from './signup/views/SignupPage';
import DashboardPage from './dashboard/views/DashboardPage';
import AdminUsersPage from './admin/views/AdminUsersPage';
import DonationHistoryPage from './donations/views/DonationHistoryPage';
import CharityManagementPage from './charities/views/CharityManagementPage';
import TaxDeductionPage from './tax_deduction/views/TaxDeductionPage'; 
import ApproveAdminsPage from './admin/views/ApproveAdminsPage';
import RequireSuperadmin from './admin/components/RequireSuperadmin';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ForgetPasswordPage from './login/views/ForgetPasswordPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin-users" element={<AdminUsersPage />} />
        <Route path="/donations" element={<DonationHistoryPage />} />
        <Route path="/charity" element={<CharityManagementPage />} />
        <Route path="/tax-deduction" element={<TaxDeductionPage />} /> 
        <Route path="*" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/admin/approve" element={
          <RequireSuperadmin>
            <ApproveAdminsPage />
          </RequireSuperadmin>
        } />
      </Routes>
    </Router>
  );
}

export default App;


