import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';

const FundraisingProgressCard = () => {
  const [progress, setProgress] = useState('--');

  useEffect(() => {
    fetch('http://localhost:5000/api/fundraising/progress')
      .then((res) => res.json())
      .then((data) => {
        setProgress(data.progress || '--%');
      })
      .catch((err) => {
        console.error('Error fetching fundraising progress:', err);
        setProgress('--%');
      });
  }, []);

  return (
    <StatCard title="FUNDRAISING TARGET PROGRESS" color="#facc15">
      {progress}
    </StatCard>
  );
};

export default FundraisingProgressCard;

