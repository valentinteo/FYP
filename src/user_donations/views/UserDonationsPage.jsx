import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DonateSection from '../components/DonateSection';
import CharityCard from '../components/CharityCard';

const UserDonationsPage = () => {
  const [charities, setCharities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/user-donations')
      .then((res) => res.json())
      .then((data) => setCharities(data))
      .catch((err) => {
        console.error('❌ Failed to fetch charities:', err);
        setCharities([]);
      });
  }, []);

  const filteredCharities = charities.filter((charity) =>
    charity.charity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charity.charity_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <DonateSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div style={styles.grid}>
        {filteredCharities.map((charity) => (
          <CharityCard key={charity.charity_id} charity={charity} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
    padding: '0 20px 60px',
  },
};

export default UserDonationsPage;