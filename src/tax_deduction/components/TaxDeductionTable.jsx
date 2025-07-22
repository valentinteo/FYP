import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TaxDeductionTable = ({ donations }) => {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDonations = donations.filter((donation) => {
    if (filter === 'All') return true;
    return donation.eligibility === filter;
  });

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="eligibilityFilter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filter by Eligibility:
        </label>
        <select
          id="eligibilityFilter"
          value={filter}
          onChange={handleFilterChange}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="All">All</option>
          <option value="Eligible">Eligible</option>
          <option value="Not Eligible">Not Eligible</option>
        </select>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#2F80ED', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Donation ID</th>
            <th style={{ padding: '12px' }}>Date</th>
            <th style={{ padding: '12px' }}>Charity Name</th>
            <th style={{ padding: '12px' }}>Amount (SGD)</th>
            <th style={{ padding: '12px' }}>User</th>
            <th style={{ padding: '12px' }}>Eligibility</th>
            <th style={{ padding: '12px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonations.map((donation, idx) => (
            <tr
              key={idx}
              style={{
                borderBottom: '1px solid #eee',
                backgroundColor: donation.eligibility === 'Eligible' ? '#e8fbe8' : '#ffecec',
              }}
            >
              <td style={{ padding: '10px' }}>{donation.donation_id}</td>
              <td style={{ padding: '10px' }}>
                {new Date(donation.date).toLocaleString('en-GB')}
              </td>
              <td style={{ padding: '10px' }}>{donation.charity_name}</td>
              <td style={{ padding: '10px' }}>${Number(donation.donation_amount).toFixed(2)}</td>
              <td style={{ padding: '10px' }}>{donation.user}</td>
              <td style={{ padding: '10px' }}>
                {donation.eligibility === 'Eligible' ? (
                  <FaCheckCircle color="green" size={18} />
                ) : (
                  <FaTimesCircle color="red" size={18} />
                )}
              </td>
              <td style={{ padding: '10px' }}>${Number(donation.total_donated).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxDeductionTable;

