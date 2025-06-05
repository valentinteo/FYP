import React, { useEffect, useState } from 'react';
import StatCard from './StatCard'; 

const TotalDonationsCard = () => {
  const [totalDonations, setTotalDonations] = useState('--');

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/total')
      .then((res) => res.json())
      .then((data) => {
        const amount = Number(data.total_donations || 0).toLocaleString('en-SG', {
          style: 'currency',
          currency: 'SGD'
        });
        setTotalDonations(amount);
      })
      .catch((err) => {
        console.error('Error fetching total donations:', err);
        setTotalDonations('--');
      });
  }, []);

  return (
    <StatCard title="TOTAL DONATIONS COLLECTED" color="#3b82f6">
      {totalDonations}
    </StatCard>
  );
};

export default TotalDonationsCard;
