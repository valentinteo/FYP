// // // // import React, { useState, useEffect } from 'react';
// // // // import Sidebar from '../../common/Sidebar';
// // // // import TaxDeductionTable from '../components/TaxDeductionTable';

// // // // const TaxDeductionPage = () => {
// // // //   const [donations, setDonations] = useState([]);
// // // //   const [searchTerm, setSearchTerm] = useState('');

// // // //   useEffect(() => {
// // // //     fetch('http://localhost:5000/api/tax-deduction')
// // // //       .then((res) => res.json())
// // // //       .then((data) => setDonations(data))
// // // //       .catch((err) => console.error('Failed to fetch data', err));
// // // //   }, []);

// // // //   const filtered = donations.filter((item) =>
// // // //     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   return (
// // // //     <div style={{ display: 'flex' }}>
// // // //       <Sidebar />
// // // //       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
// // // //         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search by name or charity"
// // // //           value={searchTerm}
// // // //           onChange={(e) => setSearchTerm(e.target.value)}
// // // //           style={{
// // // //             padding: '0.5rem',
// // // //             marginBottom: '1.5rem',
// // // //             width: '300px',
// // // //             borderRadius: '6px',
// // // //             border: '1px solid #ccc',
// // // //           }}
// // // //         />
// // // //         <TaxDeductionTable donations={filtered} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TaxDeductionPage;

// // // // import React, { useState, useEffect } from 'react';
// // // // import Sidebar from '../../common/Sidebar';
// // // // import TaxDeductionTable from '../components/TaxDeductionTable';
// // // // import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
// // // // import GroupedTotalsTable from '../components/GroupedTotalsTable';


// // // // const TaxDeductionPage = () => {
// // // //   const [donations, setDonations] = useState([]);
// // // //   const [searchTerm, setSearchTerm] = useState('');

// // // //   useEffect(() => {
// // // //     fetch('http://localhost:5000/api/tax-deduction')
// // // //       .then((res) => res.json())
// // // //       .then((data) => setDonations(data))
// // // //       .catch((err) => console.error('Failed to fetch data', err));
// // // //   }, []);

// // // //   const filtered = donations.filter((item) =>
// // // //     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );
  
// // // //   return (
// // // //     <div style={{ display: 'flex' }}>
// // // //       <Sidebar />
// // // //       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
// // // //         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
// // // //         <TaxDeductionSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
// // // //         <TaxDeductionTable donations={filtered} />
// // // //         <GroupedTotalsTable donations={filtered} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TaxDeductionPage;

// // // import React, { useState, useEffect } from 'react';
// // // import Sidebar from '../../common/Sidebar';
// // // import TaxDeductionTable from '../components/TaxDeductionTable';
// // // import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
// // // import GroupedTotalsTable from '../components/GroupedTotalsTable';
// // // import { useNavigate } from 'react-router-dom';

// // // const TaxDeductionPage = () => {
// // //   const [donations, setDonations] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [adminData, setAdminData] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     try {
// // //       const stored = localStorage.getItem('admin');
// // //       if (!stored || stored === 'undefined') {
// // //         setAdminData(null);
// // //       } else {
// // //         setAdminData(JSON.parse(stored));
// // //       }
// // //     } catch (err) {
// // //       console.error('Failed to parse admin data from localStorage:', err);
// // //       setAdminData(null);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (adminData && ['tax_admin', 'superadmin'].includes(adminData.admin_role)) {
// // //       fetch('http://localhost:5000/api/tax-deduction')
// // //         .then((res) => res.json())
// // //         .then((data) => setDonations(data))
// // //         .catch((err) => console.error('Failed to fetch data', err));
// // //     }
// // //   }, [adminData]);

// // //   const filtered = donations.filter((item) =>
// // //     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   if (adminData === null) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (!['tax_admin', 'superadmin'].includes(adminData.admin_role)) {
// // //     return (
// // //       <div style={{ padding: '2rem' }}>
// // //         <h2>Access Denied</h2>
// // //         <p>You do not have permission to view this page.</p>
// // //         <button
// // //           onClick={() => navigate('/dashboard')}
// // //           style={{
// // //             marginTop: '1rem',
// // //             padding: '0.5rem 1rem',
// // //             backgroundColor: '#007bff',
// // //             color: 'white',
// // //             border: 'none',
// // //             borderRadius: '4px',
// // //             cursor: 'pointer'
// // //           }}
// // //         >
// // //           Go Back to Dashboard
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={{ display: 'flex' }}>
// // //       <Sidebar />
// // //       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
// // //         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
// // //         <TaxDeductionSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
// // //         <TaxDeductionTable donations={filtered} />
// // //         <GroupedTotalsTable donations={filtered} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TaxDeductionPage;

// // import React, { useState, useEffect } from 'react';
// // import Sidebar from '../../common/Sidebar';
// // import TaxDeductionTable from '../components/TaxDeductionTable';
// // import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
// // import GroupedTotalsTable from '../components/GroupedTotalsTable';
// // import { useNavigate } from 'react-router-dom';

// // const TaxDeductionPage = () => {
// //   const [donations, setDonations] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [adminData, setAdminData] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     try {
// //       const stored = localStorage.getItem('admin');
// //       const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
// //       if (parsed?.admin && ['Tax Admin', 'superadmin'].includes(parsed.admin.admin_role)) {
// //         setAdminData(parsed.admin);
// //       } else {
// //         setAdminData('unauthorized');
// //       }
// //     } catch (err) {
// //       console.error('Invalid admin local data', err);
// //       setAdminData('unauthorized');
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (adminData && adminData !== 'unauthorized') {
// //       fetch('http://localhost:5000/api/tax-deduction')
// //         .then((res) => res.json())
// //         .then((data) => setDonations(data))
// //         .catch((err) => console.error('Failed to fetch data', err));
// //     }
// //   }, [adminData]);

// //   const filtered = donations.filter((item) =>
// //     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (adminData === null) return <div>Loading...</div>;

// //   if (adminData === 'unauthorized') {
// //     return (
// //       <div style={{ padding: '2rem' }}>
// //         <h2>Access Denied</h2>
// //         <p>You do not have permission to view this page.</p>
// //         <button
// //           onClick={() => navigate('/dashboard')}
// //           style={{
// //             marginTop: '1rem',
// //             padding: '0.5rem 1rem',
// //             backgroundColor: '#007bff',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '4px',
// //             cursor: 'pointer'
// //           }}
// //         >
// //           Go Back to Dashboard
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <Sidebar />
// //       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
// //         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
// //         <TaxDeductionSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
// //         <TaxDeductionTable donations={filtered} />
// //         <GroupedTotalsTable donations={filtered} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaxDeductionPage;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '../../common/Sidebar';
// import TaxDeductionTable from '../components/TaxDeductionTable';
// import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
// import GroupedTotalsTable from '../components/GroupedTotalsTable';

// const TaxDeductionPage = () => {
//   const [donations, setDonations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [adminData, setAdminData] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const { admin_email, admin_password } = location.state || {};

//     if (!admin_email || !admin_password) {
//       navigate('/login');
//       return;
//     }

//     fetch('http://localhost:5000/api/auth/me', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ admin_email, admin_password })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (!['Tax Admin', 'SuperAdmin'].includes(data.admin_role)) {
//           navigate('/unauthorized', {
//             state: {
//               admin_email,
//               admin_password,
//               admin_role: data.admin_role
//             }
//           });
//         } else {
//           setAdminData(data);
//           fetch('http://localhost:5000/api/tax-deduction')
//             .then(res => res.json())
//             .then(setDonations)
//             .catch(err => console.error('Failed to fetch data', err));
//         }
//       })
//       .catch(err => {
//         console.error('Auth error:', err);
//         navigate('/login');
//       });
//   }, [location.state, navigate]);

//   const filtered = donations.filter((item) =>
//     (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (adminData === null) return <div>Loading...</div>;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1, marginLeft: '240px', padding: '2rem 2rem 2rem 3rem' }}>
//         <h2 style={{ marginBottom: '1rem', color: '#333' }}>Tax Deduction Eligibility</h2>
//         <TaxDeductionSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
//         <TaxDeductionTable donations={filtered} />
//         <GroupedTotalsTable donations={filtered} />
//       </div>
//     </div>
//   );
// };

// export default TaxDeductionPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import TaxDeductionTable from '../components/TaxDeductionTable';
import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
import GroupedTotalsTable from '../components/GroupedTotalsTable';

const TaxDeductionPage = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { admin_email, admin_password } = location.state || {};

    if (!admin_email || !admin_password) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email, admin_password })
    })
      .then(res => res.json())
      .then(data => {
        const role = data.admin_role?.toLowerCase();
        if (!['superadmin', 'tax admin'].includes(role)) {
          navigate('/unauthorized', {
            state: {
              admin_email,
              admin_password,
              admin_role: data.admin_role
            }
          });
        } else {
          setAdminData(data);
          fetch('http://localhost:5000/api/tax-deduction')
            .then(res => res.json())
            .then(setDonations)
            .catch(err => console.error('Failed to fetch data', err));
        }
      })
      .catch(err => {
        console.error('Auth error:', err);
        navigate('/login');
      });
  }, [location.state, navigate]);

  const filtered = donations.filter((item) =>
    (item.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (adminData === null) return <div>Loading...</div>;

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
