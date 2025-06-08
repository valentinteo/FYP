import React from 'react';

const TaxDeductionSearchBar = ({ searchTerm, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or charity"
      value={searchTerm}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '0.5rem',
        marginBottom: '1.5rem',
        width: '300px',
        borderRadius: '6px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default TaxDeductionSearchBar;
