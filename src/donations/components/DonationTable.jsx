import React, { useState } from 'react';

const DonationTable = ({ donations }) => {
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

  const formatAmount = (amount) =>
    Number(amount).toLocaleString('en-SG', {
      style: 'currency',
      currency: 'SGD'
    });

  const filteredDonations = donations.filter((donation) => {
    const amt = parseFloat(donation.amount);
    const min = parseFloat(minAmount);
    const max = parseFloat(maxAmount);

    return (
      (isNaN(min) || amt >= min) &&
      (isNaN(max) || amt <= max)
    );
  });

  return (
    <>
      {/* 🔍 Filter Controls */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label>
          Min Amount:{' '}
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="e.g. 10"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label>
          Max Amount:{' '}
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="e.g. 100"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
      </div>

      {/* 📊 Table */}
      <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ backgroundColor: '#3366ff', color: '#fff' }}>
              {['DATE', 'NAME', 'EMAIL', 'CHARITIES', 'AMOUNT'].map((col, idx) => (
                <th key={idx} style={{ padding: '14px 12px', textAlign: 'left' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f4f6fc' : '#ffffff',
                  transition: 'background-color 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8f0fe')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f4f6fc' : '#ffffff')}
              >
                <td style={{ padding: '12px' }}>{formatDate(donation.date)}</td>
                <td style={{ padding: '12px' }}>{donation.name}</td>
                <td style={{ padding: '12px' }}>
                  <a href={`mailto:${donation.email}`} style={{ color: '#3366ff' }}>
                    {donation.email}
                  </a>
                </td>
                <td style={{ padding: '12px' }}>{donation.charity}</td>
                <td style={{ padding: '12px' }}>{formatAmount(donation.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DonationTable;
