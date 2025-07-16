import React from 'react';

const UserDonationsTable = ({ donations }) => {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Donor Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Campaign</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((donation, index) => (
          <tr key={index}>
            <td>{donation.name}</td>
            <td>${donation.amount}</td>
            <td>{donation.date}</td>
            <td>{donation.campaign}</td>
            <td>{donation.payment_method}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDonationsTable;
