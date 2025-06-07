import React from 'react';
import styles from './DonationHistoryStyles'; 

const DonationSearchBar = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or charity"
      value={searchTerm}
      onChange={(e) => onChange(e.target.value)}
      style={styles.searchBox}
    />
  );
};

export default DonationSearchBar;
