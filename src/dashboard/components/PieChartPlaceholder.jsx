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
        let merchantTotal = 0;
        let userTotal = 0;

        donations.forEach((donation) => {
          if (donation.donation_mode === 'merchant') {
            merchantTotal += Number(donation.donation_amount);
          } else if (donation.donation_mode === 'user') {
            userTotal += Number(donation.donation_amount);
          }
        });

        setChartData([
          { name: 'Merchant Discount', value: merchantTotal },
          { name: 'User Discount', value: userTotal },
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
