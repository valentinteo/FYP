import React from 'react';
import Sidebar from '../../common/Sidebar';
import StatCard from '../components/StatCard';
import PieChartPlaceholder from '../components/PieChartPlaceholder';
import BarChartPlaceholder from '../components/BarChartPlaceholder';

const DashboardPage = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flex: 1, padding: '1rem' }}>
      <h2>DASHBOARD</h2>

      <div style={{ display: 'flex', marginLeft: '240px', padding: '1rem'}}>
        <StatCard title="TOTAL DONATIONS COLLECTED" color="#3b82f6">--</StatCard>
        <StatCard title="TOTAL NUMBER OF DONORS" color="#22c55e">--</StatCard>
        <StatCard title="FUNDRAISING TARGET PROGRESS" color="#facc15">--%</StatCard>
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
