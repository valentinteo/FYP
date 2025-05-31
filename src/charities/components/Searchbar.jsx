import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by Charity Name or UEN"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '0.5rem 1rem',
        margin: '1rem 0',
        width: '100%',
        maxWidth: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default SearchBar;
