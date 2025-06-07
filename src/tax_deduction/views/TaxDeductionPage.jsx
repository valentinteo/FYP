// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../common/Sidebar';
// import TaxDeductionTable from '../components/TaxDeductionTable';

// const TaxDeductionPage = () => {
//   const [donations, setDonations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/tax-deduction')
//       .then((res) => res.json())
//       .then((data) => setDonations(data))
//       .catch((err) => console.error('Failed to fetch data', err));
//   }, []);

//   const filtered = donations.filter((item) =>
//     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
//         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
//         <input
//           type="text"
//           placeholder="Search by name or charity"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             padding: '0.5rem',
//             marginBottom: '1.5rem',
//             width: '300px',
//             borderRadius: '6px',
//             border: '1px solid #ccc',
//           }}
//         />
//         <TaxDeductionTable donations={filtered} />
//       </div>
//     </div>
//   );
// };

// export default TaxDeductionPage;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../common/Sidebar';
import TaxDeductionTable from '../components/TaxDeductionTable';

const TaxDeductionPage = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tax-deduction')
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error('Failed to fetch data', err));
  }, []);

  const filtered = donations.filter((item) =>
    (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const computeGroupedTotals = (donations) => {
    const summary = {};
    donations.forEach((d) => {
      const key = `${d.user} - ${d.charity_name}`;
      if (!summary[key]) {
        summary[key] = {
          user: d.user,
          charity_name: d.charity_name,
          total: 0,
        };
      }
      summary[key].total += parseFloat(d.donation_amount);
    });
    return Object.values(summary);
  };

  const cellStyle = {
    padding: '0.75rem',
    border: '1px solid #ddd',
    fontSize: '14px',
  };

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
            marginBottom: '1.5rem',
            width: '300px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
        <TaxDeductionTable donations={filtered} />

        {/* Grouped Totals Section */}
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>Grouped Totals</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#444', color: '#fff' }}>
            <tr>
              <th style={cellStyle}>User</th>
              <th style={cellStyle}>Charity</th>
              <th style={cellStyle}>Total Donated (SGD)</th>
            </tr>
          </thead>
          <tbody>
            {computeGroupedTotals(filtered).map((group, index) => (
              <tr key={index} style={{ textAlign: 'center', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={cellStyle}>{group.user}</td>
                <td style={cellStyle}>{group.charity_name}</td>
                <td style={cellStyle}>${group.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxDeductionPage;
