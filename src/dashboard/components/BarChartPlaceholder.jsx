import React, { useEffect, useState } from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend} from 'recharts';
import styles from './BarChartStyles';

const BarChartPlaceholder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/charity-summary')
      .then((res) => res.json())
      .then((data) => {
        const topFive = data
          .sort((a, b) => b.total_donated - a.total_donated)
          .slice(0, 5);
        setData(topFive);
      })
      .catch((err) => console.error('Error fetching donation data:', err));
  }, []);

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Top 5 Best Performing Charities</h4>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={styles.chartMargin}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="charity_name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="total_donated" name="Total Donated" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartPlaceholder;
