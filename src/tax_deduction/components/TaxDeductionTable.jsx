import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TaxDeductionTable = ({ donations }) => {
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      fontSize: '14px'
    }}>
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
        {donations.map((donation, idx) => (
          <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{donation.id}</td>
            <td style={{ padding: '10px' }}>{donation.date}</td>
            <td style={{ padding: '10px' }}>{donation.charity}</td>
            <td style={{ padding: '10px' }}>${donation.amount}</td>
            <td style={{ padding: '10px' }}>{donation.user}</td>
            <td style={{ padding: '10px' }}>
              {donation.eligible ? (
                <FaCheckCircle color="green" size={18} />
              ) : (
                <FaTimesCircle color="red" size={18} />
              )}
            </td>
            <td style={{ padding: '10px' }}>${donation.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaxDeductionTable;
