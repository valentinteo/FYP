import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/Sidebar';
import CharityTable from '../components/CharityTable';

const CharityManagementPage = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    // Replace with actual API endpoint
    fetch('http://localhost:5000/api/charities')
      .then((res) => res.json())
      .then((data) => setCharities(data))
      .catch((err) => {
        console.error('Failed to fetch charities:', err);
        setCharities([]); // fallback
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>MANAGE CHARITY ORGANIZATION</h2>
          <button style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}>
            + Add New Charity
          </button>
        </div>
        <button style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', margin: '1rem 0' }}>
          Date Added
        </button>
        <CharityTable charities={charities} />
      </div>
    </div>
  );
};

export default CharityManagementPage;
