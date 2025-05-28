import React, { useState, useEffect } from 'react';
import Sidebar from '../../common/Sidebar';

const TaxDeductionPage = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/tax-deductions')
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error('Failed to fetch data', err));
  }, []);

  const filtered = donations.filter((item) =>
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.charity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEligibilityIcon = (eligible) => (
    <span
      style={{
        color: 'white',
        backgroundColor: eligible ? 'green' : 'red',
        borderRadius: '50%',
        padding: '4px 8px',
        fontWeight: 'bold',
      }}
    >
      {eligible ? '✔' : '✘'}
    </span>
  );

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
        <input
          type="text"
          placeholder="Search by name or charity"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            marginBottom: '1rem',
            width: '300px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#3366ff', color: 'white' }}>
            <tr>
              <th style={cellStyle}>Donation ID</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Charity Name</th>
              <th style={cellStyle}>Donation Amount</th>
              <th style={cellStyle}>User</th>
              <th style={cellStyle}>Eligibility</th>
              <th style={cellStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((donation, index) => (
              <tr
                key={index}
                style={{
                  textAlign: 'center',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                }}
              >
                <td style={cellStyle}>{donation.id}</td>
                <td style={cellStyle}>{donation.date}</td>
                <td style={cellStyle}>{donation.charity}</td>
                <td style={cellStyle}>${donation.amount}</td>
                <td style={cellStyle}>{donation.user}</td>
                <td style={cellStyle}>{getEligibilityIcon(donation.eligible)}</td>
                <td style={cellStyle}>${donation.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const cellStyle = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  fontSize: '14px',
};

export default TaxDeductionPage;
