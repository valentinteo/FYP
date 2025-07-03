// // // import React, { useState, useEffect } from 'react';
// // // import DonationTable from '../components/DonationTable';
// // // import Sidebar from '../../common/Sidebar';
// // // import styles from '../components/DonationHistoryStyles';
// // // import DonationSearchBar from '../components/DonationSearchBar';
// // // import ExportToPDFButton from '../../common/ExportToPDFButton';

// // // const DonationHistoryPage = () => {
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [donations, setDonations] = useState([]);

// // //   useEffect(() => {
// // //     fetch('http://localhost:5000/api/donations')
// // //       .then((res) => res.json())
// // //       .then((data) => setDonations(data))
// // //       .catch((err) => {
// // //         console.error('Failed to fetch data from backend:', err);
// // //         setDonations([]); // fallback empty
// // //       });
// // //   }, []);

// // //   const filteredDonations = donations.filter((donation) => {
// // //     const term = searchTerm.toLowerCase();
// // //     return (
// // //       donation.name?.toLowerCase().includes(term) ||
// // //       donation.charity?.toLowerCase().includes(term)
// // //     );
// // //   });

// // //   return (
// // //     <div style={styles.container}>
// // //       <Sidebar />
// // //       <div style={styles.contentWrapper}>
// // //         <h2 style={styles.title}>DONATIONS</h2>
// // //         <p style={styles.subtitle}>All Donations History</p>

// // //         <DonationSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

// // //         <ExportToPDFButton
// // //           title="Donation History"
// // //           fileName="donations.pdf"
// // //           columns={['Date', 'Name', 'Email', 'Charity', 'Amount']}
// // //           data={filteredDonations.map((d) => [
// // //             new Date(d.date).toLocaleString('en-GB'),
// // //             d.name,
// // //             d.email,
// // //             d.charity,
// // //             `$${Number(d.amount).toFixed(2)}`
// // //           ])}
// // //         />

// // //         <DonationTable donations={filteredDonations} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DonationHistoryPage;

// // import React, { useState, useEffect } from 'react';
// // import DonationTable from '../components/DonationTable';
// // import Sidebar from '../../common/Sidebar';
// // import styles from '../components/DonationHistoryStyles';
// // import DonationSearchBar from '../components/DonationSearchBar';
// // import ExportToPDFButton from '../../common/ExportToPDFButton';
// // import { useNavigate } from 'react-router-dom';

// // const DonationHistoryPage = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [donations, setDonations] = useState([]);
// //   const [adminData, setAdminData] = useState(null);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     try {
// //       const stored = localStorage.getItem('admin');
// //       if (!stored || stored === 'undefined') {
// //         setAdminData(null);
// //       } else {
// //         setAdminData(JSON.parse(stored));
// //       }
// //     } catch (err) {
// //       console.error('Invalid admin local data', err);
// //       setAdminData(null);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (adminData && ['charity_admin', 'superadmin'].includes(adminData.admin_role)) {
// //       fetch('http://localhost:5000/api/donations')
// //         .then(async (res) => {
// //           const contentType = res.headers.get('content-type');
// //           if (res.ok && contentType && contentType.includes('application/json')) {
// //             return res.json();
// //           } else {
// //             const text = await res.text();
// //             throw new Error(`Unexpected response: ${text}`);
// //           }
// //         })
// //         .then((data) => setDonations(data))
// //         .catch((err) => {
// //           console.error('Failed to fetch data from backend:', err);
// //           setError('Failed to load donations. Please try again later.');
// //         });
// //     }
// //   }, [adminData]);

// //   const filteredDonations = donations.filter((donation) => {
// //     const term = searchTerm.toLowerCase();
// //     return (
// //       donation.name?.toLowerCase().includes(term) ||
// //       donation.charity?.toLowerCase().includes(term)
// //     );
// //   });

// //   if (adminData === null) return <div>Loading...</div>;

// //   if (!['charity_admin', 'superadmin'].includes(adminData.admin_role)) {
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
// //             color: '#fff',
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
// //     <div style={styles.container}>
// //       <Sidebar />
// //       <div style={styles.contentWrapper}>
// //         <h2 style={styles.title}>DONATIONS</h2>
// //         <p style={styles.subtitle}>All Donations History</p>

// //         {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

// //         <DonationSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

// //         <ExportToPDFButton
// //           title="Donation History"
// //           fileName="donations.pdf"
// //           columns={['Date', 'Name', 'Email', 'Charity', 'Amount']}
// //           data={filteredDonations.map((d) => [
// //             new Date(d.date).toLocaleString('en-GB'),
// //             d.name,
// //             d.email,
// //             d.charity,
// //             `$${Number(d.amount).toFixed(2)}`
// //           ])}
// //         />

// //         <DonationTable donations={filteredDonations} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default DonationHistoryPage;

// import React, { useState, useEffect } from 'react';
// import DonationTable from '../components/DonationTable';
// import Sidebar from '../../common/Sidebar';
// import styles from '../components/DonationHistoryStyles';
// import DonationSearchBar from '../components/DonationSearchBar';
// import ExportToPDFButton from '../../common/ExportToPDFButton';
// import { useNavigate } from 'react-router-dom';

// const DonationHistoryPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [donations, setDonations] = useState([]);
//   const [adminData, setAdminData] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem('admin');
//       const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
//       if (parsed?.admin && ['charity_admin', 'superadmin'].includes(parsed.admin.admin_role)) {
//         setAdminData(parsed.admin);
//       } else {
//         setAdminData('unauthorized');
//       }
//     } catch (err) {
//       console.error('Invalid admin local data', err);
//       setAdminData('unauthorized');
//     }
//   }, []);

//   useEffect(() => {
//     if (adminData && adminData !== 'unauthorized') {
//       fetch('http://localhost:5000/api/donations')
//         .then(async (res) => {
//           const contentType = res.headers.get('content-type');
//           if (res.ok && contentType && contentType.includes('application/json')) {
//             return res.json();
//           } else {
//             const text = await res.text();
//             throw new Error(`Unexpected response: ${text}`);
//           }
//         })
//         .then((data) => setDonations(data))
//         .catch((err) => {
//           console.error('Failed to fetch data from backend:', err);
//           setError('Failed to load donations. Please try again later.');
//         });
//     }
//   }, [adminData]);

//   const filteredDonations = donations.filter((donation) => {
//     const term = searchTerm.toLowerCase();
//     return donation.name?.toLowerCase().includes(term) || donation.charity?.toLowerCase().includes(term);
//   });

//   if (adminData === null) return <div>Loading...</div>;

//   if (adminData === 'unauthorized') {
//     return (
//       <div style={{ padding: '2rem' }}>
//         <h2>Access Denied</h2>
//         <p>You do not have permission to view this page.</p>
//         <button
//           onClick={() => navigate('/dashboard')}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Go Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <Sidebar />
//       <div style={styles.contentWrapper}>
//         <h2 style={styles.title}>DONATIONS</h2>
//         <p style={styles.subtitle}>All Donations History</p>
//         {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
//         <DonationSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
//         <ExportToPDFButton
//           title="Donation History"
//           fileName="donations.pdf"
//           columns={['Date', 'Name', 'Email', 'Charity', 'Amount']}
//           data={filteredDonations.map((d) => [
//             new Date(d.date).toLocaleString('en-GB'),
//             d.name,
//             d.email,
//             d.charity,
//             `$${Number(d.amount).toFixed(2)}`
//           ])}
//         />
//         <DonationTable donations={filteredDonations} />
//       </div>
//     </div>
//   );
// };

// export default DonationHistoryPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DonationTable from '../components/DonationTable';
import Sidebar from '../../common/Sidebar';
import styles from '../components/DonationHistoryStyles';
import DonationSearchBar from '../components/DonationSearchBar';
import ExportToPDFButton from '../../common/ExportToPDFButton';

const DonationHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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
        if (!['superadmin', 'Charity Admin'].includes(data.admin_role)) {
          navigate('/unauthorized', {
            state: {
              admin_email,
              admin_password,
              admin_role: data.admin_role
            }
          });
        } else {
          setAdminData(data);
          fetch('http://localhost:5000/api/donations')
            .then(res => res.json())
            .then(setDonations)
            .catch(err => {
              console.error('Fetch donations failed:', err);
              setError('Failed to load donations. Please try again later.');
            });
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        navigate('/login');
      });
  }, [location.state, navigate]);

  const filteredDonations = donations.filter((d) => {
    const term = searchTerm.toLowerCase();
    return d.name?.toLowerCase().includes(term) || d.charity?.toLowerCase().includes(term);
  });

  if (adminData === null) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.contentWrapper}>
        <h2 style={styles.title}>DONATIONS</h2>
        <p style={styles.subtitle}>All Donations History</p>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <DonationSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
        <ExportToPDFButton
          title="Donation History"
          fileName="donations.pdf"
          columns={['Date', 'Name', 'Email', 'Charity', 'Amount']}
          data={filteredDonations.map((d) => [
            new Date(d.date).toLocaleString('en-GB'),
            d.name,
            d.email,
            d.charity,
            `$${Number(d.amount).toFixed(2)}`
          ])}
        />
        <DonationTable donations={filteredDonations} />
      </div>
    </div>
  );
};

export default DonationHistoryPage;
