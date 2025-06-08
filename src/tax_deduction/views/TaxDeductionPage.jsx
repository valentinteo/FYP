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
import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
import GroupedTotalsTable from '../components/GroupedTotalsTable';


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
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
        <TaxDeductionSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
        <TaxDeductionTable donations={filtered} />
        <GroupedTotalsTable donations={filtered} />
      </div>
    </div>
  );
};

export default TaxDeductionPage;
