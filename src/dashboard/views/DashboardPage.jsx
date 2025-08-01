import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import PieChartPlaceholder from '../components/PieChartPlaceholder';
import BarChartPlaceholder from '../components/BarChartPlaceholder';
import TotalDonationsCard from '../components/TotalDonationsCard';
import TotalDonorsCard from '../components/TotalDonorsCard';
import FundraisingProgressCard from '../components/FundraisingProgressCard';

const DashboardPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
      method: 'GET',
      credentials: 'include', // ✅ Session-based auth
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        setAdminData(data);
      })
      .catch(err => {
        console.error('Auth failed:', err);
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/total')
      .then(res => res.json())
      .then(data => {
        setTotalDonations(data.total || 0);
      })
      .catch(err => {
        console.error('Failed to fetch total donations:', err);
      });
  }, []);

  if (adminData === null) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', overflowX: 'hidden' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        padding: '2rem',
        paddingLeft: '280px',
        boxSizing: 'border-box',
        maxWidth: '100vw',
        overflowX: 'hidden'
      }}>
        <h2>DASHBOARD</h2>

        {/* Top Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          padding: '1rem'
        }}>
          <TotalDonationsCard />
          <TotalDonorsCard />
          <FundraisingProgressCard totalDonations={totalDonations} />
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{ flex: 1 }}>
            <PieChartPlaceholder />
          </div>
          <div style={{ flex: 2 }}>
            <BarChartPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;