import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import DonateSection from '../components/DonateSection';
import CharityCard from '../components/CharityCard';

const UserDonationsPage = () => {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/user-donations')
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Charities fetched:', data);
        setCharities(data);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch Charities:', err);
        setCharities([]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <DonateSection />
      <div style={styles.container}>
        {charities.map((charity, index) => (
          <div key={index} style={styles.cardWrapper}>
            <CharityCard charity={charity} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    padding: '40px',
    justifyItems: 'center',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default UserDonationsPage;



// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserDonationsTable from '../components/UserDonationsTable';
// import UserDonationsSearchBar from '../components/UserDonationsSearchBar';

// const UserDonationsPage = () => {
//   const [donations, setDonations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const { admin_email, admin_password } = location.state || {};

//     if (!admin_email || !admin_password) {
//       navigate('/login');
//       return;
//     }

//     fetch('http://localhost:5000/api/user-donations')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('✅ Donations fetched:', data);
//         setDonations(data);
//       })
//       .catch((err) => {
//         console.error('❌ Failed to fetch donations:', err);
//         setDonations([]);
//       });
//   }, [location, navigate]);

//   const filteredDonations = donations.filter((donation) =>
//     donation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     donation.campaign?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>User Donations</h2>
//       <UserDonationsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <UserDonationsTable donations={filteredDonations} />
//     </div>
//   );
// };

// export default UserDonationsPage;
