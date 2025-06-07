import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import styles from './PieChartStyles';

const COLORS = ['#0088FE', '#00C49F'];

const PieChartPlaceholder = () => {
  const [chartData, setChartData] = useState([
    { name: 'Merchant Discount', value: 0 },
    { name: 'User Discount', value: 0 },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/donationMode')
      .then((res) => res.json())
      .then((donations) => {
        let merchantCount = 0;
        let userCount = 0;

        donations.forEach((donation) => {
          const mode = donation.donation_mode;
          if (mode === 'merchant') merchantCount += 1;
          else if (mode === 'user') userCount += 1;
        });

        setChartData([
          { name: 'Merchant Discount', value: merchantCount },
          { name: 'User Discount', value: userCount },
        ]);
      })
      .catch((err) => {
        console.error('Failed to fetch donation data:', err);
      });
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h4 style={styles.title}>Donation Modes</h4>
        <PieChart width={styles.chartSize.width} height={styles.chartSize.height}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={styles.chartSize.outerRadius}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartPlaceholder;

