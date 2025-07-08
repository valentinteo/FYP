import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../user_donations/components/Navbar';
import CharityProfileCard from '../../user_donations/components/CharityProfileCard';
import DonationOptions from '../../user_donations/components/DonationOptions';


const CharityDetailsPage = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/charities/${id}`)
      .then((res) => res.json())
      .then((data) => setCharity(data))
      .catch((err) => console.error('Failed to fetch charity:', err));
  }, [id]);

  if (!charity) {
    return <div>Loading charity details...</div>;
  }

  return (
    <>
      <Navbar />
      <CharityProfileCard charity={charity} />
      <DonationOptions/>
    </>
  );
};

export default CharityDetailsPage;
