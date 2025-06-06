import React from 'react';

const DonationTable = ({ donations }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount) =>
    Number(amount).toLocaleString('en-SG', {
      style: 'currency',
      currency: 'SGD'
    });

  return (
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
          {donations.map((donation, index) => (
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
  );
};

export default DonationTable;

