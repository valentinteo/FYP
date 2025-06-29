// import React, { useState, useEffect } from 'react';
// import DonationTable from '../components/DonationTable';
// import Sidebar from '../../common/Sidebar';
// import styles from '../components/DonationHistoryStyles';
// import DonationSearchBar from '../components/DonationSearchBar';
// import ExportToPDFButton from '../../common/ExportToPDFButton';

// const DonationHistoryPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/donations')
//       .then((res) => res.json())
//       .then((data) => setDonations(data))
//       .catch((err) => {
//         console.error('Failed to fetch data from backend:', err);
//         setDonations([]); // fallback empty
//       });
//   }, []);

//   const filteredDonations = donations.filter((donation) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       donation.name?.toLowerCase().includes(term) ||
//       donation.charity?.toLowerCase().includes(term)
//     );
//   });

//   return (
//     <div style={styles.container}>
//       <Sidebar />
//       <div style={styles.contentWrapper}>
//         <h2 style={styles.title}>DONATIONS</h2>
//         <p style={styles.subtitle}>All Donations History</p>

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
import DonationTable from '../components/DonationTable';
import Sidebar from '../../common/Sidebar';
import styles from '../components/DonationHistoryStyles';
import DonationSearchBar from '../components/DonationSearchBar';
import ExportToPDFButton from '../../common/ExportToPDFButton';
import { useNavigate } from 'react-router-dom';

const DonationHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [donations, setDonations] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('admin');
    if (stored) {
      setAdminData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (adminData && ['charity_admin', 'superadmin'].includes(adminData.admin_role)) {
      fetch('http://localhost:5000/api/donations')
        .then((res) => res.json())
        .then((data) => setDonations(data))
        .catch((err) => {
          console.error('Failed to fetch data from backend:', err);
          setDonations([]); // fallback empty
        });
    }
  }, [adminData]);

  const filteredDonations = donations.filter((donation) => {
    const term = searchTerm.toLowerCase();
    return (
      donation.name?.toLowerCase().includes(term) ||
      donation.charity?.toLowerCase().includes(term)
    );
  });

  if (adminData === null) {
    return <div>Loading...</div>;
  }

  if (!['Charity Admin', 'superadmin'].includes(adminData.admin_role)) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.contentWrapper}>
        <h2 style={styles.title}>DONATIONS</h2>
        <p style={styles.subtitle}>All Donations History</p>

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
