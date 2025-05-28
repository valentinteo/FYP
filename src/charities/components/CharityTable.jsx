import React from 'react';

const CharityTable = ({ charities }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#e0e0e0' }}>
      <thead style={{ backgroundColor: '#666', color: 'white' }}>
        <tr>
          <th style={{ padding: '10px' }}>CHARITY NAME</th>
          <th>UEN</th>
          <th>LAST UPDATED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {charities.map((charity, idx) => (
          <tr key={idx} style={{ textAlign: 'center' }}>
            <td>{charity.name}</td>
            <td>{charity.uen}</td>
            <td>{charity.updated}</td>
            <td>
              <button style={{ margin: '0 5px' }}>✏️</button>
              <button style={{ margin: '0 5px' }}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CharityTable;
