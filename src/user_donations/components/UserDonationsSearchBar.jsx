import React from 'react';

const UserDonationsSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or campaign"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '10px', width: '300px' }}
    />
  );
};

export default UserDonationsSearchBar;
