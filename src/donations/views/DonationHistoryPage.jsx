import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // useEffect(() => {
  //   const { admin_email, admin_password } = location.state || {};

  //   if (!admin_email || !admin_password) {
  //     navigate('/login');
  //     return;
  //   }

  //   fetch('http://localhost:5000/api/auth/me', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ admin_email, admin_password })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       const role = data.admin_role?.toLowerCase();
  //       if (!['superadmin', 'charity admin'].includes(role)) {
  //         navigate('/unauthorized', {
  //           state: {
  //             admin_email,
  //             admin_password,
  //             admin_role: data.admin_role
  //           }
  //         });
  //       } else {
  //         setAdminData(data);
  //         fetch('http://localhost:5000/api/donations')
  //           .then(res => res.json())
  //           .then(setDonations)
  //           .catch(err => {
  //             console.error('Fetch donations failed:', err);
  //             setError('Failed to load donations. Please try again later.');
  //           });
  //       }
  //     })
  //     .catch(err => {
  //       console.error('Auth check failed:', err);
  //       navigate('/login');
  //     });
  // }, [location.state, navigate]);


  useEffect(() => {
    fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
      method: 'GET',
      credentials: 'include', // ✅ Include session cookie
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(data => {
        console.log('✅ Logged-in user:', data);

        const role = data.admin_role || data.role; // supports both admin & user session
        const normalizedRole = role?.toLowerCase();

        // ❌ Redirect if not authorized
        if (!['superadmin', 'charity admin'].includes(normalizedRole)) {
          navigate('/unauthorized');
        } else {
          setAdminData(data);

          // Optionally fetch donations/charities
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
        console.error('Session check failed:', err);
        navigate('/login');
      });
  }, [navigate]);


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


