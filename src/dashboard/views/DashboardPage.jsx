// import React from 'react';
// import Sidebar from '../../common/Sidebar';
// import PieChartPlaceholder from '../components/PieChartPlaceholder';
// import BarChartPlaceholder from '../components/BarChartPlaceholder';
// import TotalDonationsCard from '../components/TotalDonationsCard';
// import TotalDonorsCard from '../components/TotalDonorsCard';
// import FundraisingProgressCard from '../components/FundraisingProgressCard';


// const DashboardPage = () => (
//   <div style={{ display: 'flex' }}>
//     <Sidebar />
//     <div style={{ flex: 1, padding: '1rem' }}>
//       <h2>DASHBOARD</h2>

//       <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem' }}>
//         <TotalDonationsCard />
//         <TotalDonorsCard />
//         <FundraisingProgressCard />
//       </div>

//       <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem' }}>
//         <div style={{ flex: 1 }}>
//           <PieChartPlaceholder />
//         </div>
//         <div style={{ flex: 2 }}>
//           <BarChartPlaceholder />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default DashboardPage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import PieChartPlaceholder from '../components/PieChartPlaceholder';
import BarChartPlaceholder from '../components/BarChartPlaceholder';
import TotalDonationsCard from '../components/TotalDonationsCard';
import TotalDonorsCard from '../components/TotalDonorsCard';
import FundraisingProgressCard from '../components/FundraisingProgressCard';

const DashboardPage = () => {
  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { admin_email, admin_password } = location.state || {};

    if (!admin_email || !admin_password) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email, admin_password })
    })
      .then(res => res.json())
      .then(data => {
        setAdminData(data);
      })
      .catch(err => {
        console.error('Auth failed:', err);
        navigate('/login');
      });
  }, [location.state, navigate]);

  if (adminData === null) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>DASHBOARD</h2>

        <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem' }}>
          <TotalDonationsCard />
          <TotalDonorsCard />
          <FundraisingProgressCard />
        </div>

        <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem' }}>
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

