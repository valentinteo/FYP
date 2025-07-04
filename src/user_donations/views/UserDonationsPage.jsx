import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import UserDonationsTable from '../components/UserDonationsTable';
import UserDonationsSearchBar from '../components/UserDonationsSearchBar';

const UserDonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { admin_email, admin_password } = location.state || {};

  useEffect(() => {
    if (!admin_email || !admin_password) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email, admin_password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.role) {
          navigate('/login');
        } else {
          setAdminData(data);

          fetch('http://localhost:5000/api/user-donations')
            .then((res) => res.json())
            .then((data) => setDonations(data))
            .catch((err) => {
              console.error('Failed to fetch donations:', err);
              setDonations([]);
            });
        }
      })
      .catch(() => navigate('/login'));
  }, [admin_email, admin_password, navigate]);

  const filtered = donations.filter((d) =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.campaign?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar admin_email={admin_email} admin_password={admin_password} />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>User Donations</h2>
        <UserDonationsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UserDonationsTable donations={filtered} />
      </div>
    </div>
  );
};

export default UserDonationsPage;
