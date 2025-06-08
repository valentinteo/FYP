import React from 'react';

const GroupedTotalsTable = ({ donations }) => {
  const computeUserTotals = (donations) => {
    const summary = {};

    donations.forEach((d) => {
      const user = d.user;
      if (!summary[user]) {
        summary[user] = {
          user,
          charities: new Set(),
          total: 0,
        };
      }

      if (d.charity_name) {
        summary[user].charities.add(d.charity_name);
      }

      const amount = parseFloat(d.donation_amount || 0);
      summary[user].total += isNaN(amount) ? 0 : amount;
    });

    return Object.values(summary).map((entry) => ({
      ...entry,
      charities: Array.from(entry.charities),
    }));
  };

  const cellStyle = {
    padding: '0.75rem',
    border: '1px solid #ddd',
    fontSize: '14px',
    verticalAlign: 'top',
  };

  const groupedData = computeUserTotals(donations);

  return (
    <>
      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>Grouped Totals</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#444', color: '#fff' }}>
          <tr>
            <th style={cellStyle}>User</th>
            <th style={cellStyle}>Charities Donated</th>
            <th style={cellStyle}>Total Donated (SGD)</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((group, index) => (
            <tr
              key={index}
              style={{
                textAlign: 'center',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              }}
            >
              <td style={cellStyle}>{group.user}</td>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: '20px', textAlign: 'left' }}>
                  {group.charities.map((charity, i) => (
                    <li key={i}>{charity}</li>
                  ))}
                </ul>
              </td>
              <td style={cellStyle}>${group.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GroupedTotalsTable;
