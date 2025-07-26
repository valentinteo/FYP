import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import TaxDeductionTable from '../components/TaxDeductionTable';
import TaxDeductionSearchBar from '../components/TaxDeductionSearchBar';
import GroupedTotalsTable from '../components/GroupedTotalsTable';

const TaxDeductionPage = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminData, setAdminData] = useState(null);
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
  //       if (!['superadmin', 'tax admin'].includes(role)) {
  //         navigate('/unauthorized', {
  //           state: {
  //             admin_email,
  //             admin_password,
  //             admin_role: data.admin_role
  //           }
  //         });
  //       } else {
  //         setAdminData(data);
  //         fetch('http://localhost:5000/api/tax-deduction')
  //           .then(res => res.json())
  //           .then(setDonations)
  //           .catch(err => console.error('Failed to fetch data', err));
  //       }
  //     })
  //     .catch(err => {
  //       console.error('Auth error:', err);
  //       navigate('/login');
  //     });
  // }, [location.state, navigate]);


  useEffect(() => {
    fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
      method: 'GET',
      credentials: 'include', // ✅ Uses session cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        const role = (data.admin_role || data.role || '').toLowerCase();

        if (!['superadmin', 'tax admin'].includes(role)) {
          navigate('/unauthorized');
        } else {
          setAdminData(data);
          fetch('http://localhost:5000/api/tax-deduction')
            .then((res) => res.json())
            .then(setDonations)
            .catch((err) => console.error('Failed to fetch data', err));
        }
      })
      .catch((err) => {
        console.error('Auth error:', err);
        navigate('/login');
      });
  }, [navigate]);


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
