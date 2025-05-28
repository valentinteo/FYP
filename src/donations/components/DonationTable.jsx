import React from 'react';

const DonationTable = ({ donations }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#3366ff', color: '#fff' }}>
          <th style={{ padding: '10px' }}>DATE</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>CHARITIES</th>
          <th>AMOUNT</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {donations.map((donation, index) => (
          <tr key={index} style={{ textAlign: 'center', backgroundColor: index % 2 ? '#f4f4f4' : '#e0e0e0' }}>
            <td>{donation.date}</td>
            <td>{donation.name}</td>
            <td><a href={`mailto:${donation.email}`}>{donation.email}</a></td>
            <td>{donation.charity}</td>
            <td>${donation.amount}</td>
            <td>
              <button style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>✔</button>
              <button style={{ backgroundColor: 'red', color: 'white' }}>✘</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DonationTable;
