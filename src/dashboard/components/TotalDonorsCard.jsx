import React, { useEffect, useState } from 'react';
import StatCard from './StatCard'; 

const TotalDonorsCard = () => {
  const [totalDonors, setTotalDonors] = useState('--');

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/donors')
      .then((res) => res.json())
      .then((data) => {
        setTotalDonors(data.total_donors || '--');
      })
      .catch((err) => {
        console.error('Error fetching total donors:', err);
        setTotalDonors('--');
      });
  }, []);

  return (
    <StatCard title="TOTAL NUMBER OF DONORS" color="#22c55e">
      {totalDonors}
    </StatCard>
  );
};

export default TotalDonorsCard;
