import React from 'react';
import Sidebar from '../../common/Sidebar';
import PieChartPlaceholder from '../components/PieChartPlaceholder';
import BarChartPlaceholder from '../components/BarChartPlaceholder';
import TotalDonationsCard from '../components/TotalDonationsCard'; 


const DashboardPage = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flex: 1, padding: '1rem' }}>
      <h2>DASHBOARD</h2>

      <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem'}}>
        <TotalDonationsCard />
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

export default DashboardPage;


