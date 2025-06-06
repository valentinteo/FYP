// import React, { useState, useEffect } from 'react';
// import DonationTable from '../components/DonationTable';
// import Sidebar from '../../common/Sidebar';


// const DonationHistoryPage = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [donations, setDonations] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/api/donations')
//             .then((res) => res.json())
//             .then((data) => setDonations(data))
//             .catch((err) => console.error('Failed to fetch data', err));
//     }, []);

//     const filteredDonations = donations.filter(donation =>
//         donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         donation.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div style={{ display: 'flex' }}>
//             <Sidebar />
//             <div style={{ marginLeft: '270px', flex: 1, padding: '2rem' }}>
//                 <h2 style={{ color: '#3366ff' }}>DONATIONS</h2>
//                 <p>All Donations History</p>
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '300px' }}
//                 />
//                 <DonationTable donations={filteredDonations} />
//             </div>
//         </div>
//     );
// };

// export default DonationHistoryPage;


import React, { useState, useEffect } from 'react';
import DonationTable from '../components/DonationTable';
import Sidebar from '../../common/Sidebar';
import styles from '../components/DonationHistoryStyles';
import DonationSearchBar from '../components/DonationSearchBar';
import ExportToPDFButton from '../../common/ExportToPDFButton';


const DonationHistoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        setDonations([
            {
                date: '2024-06-01T10:00:00Z',
                name: 'Jane Doe',
                email: 'jane@example.com',
                charity: 'Hope Foundation',
                amount: 100
            },
            {
                date: '2024-06-05T14:30:00Z',
                name: 'John Smith',
                email: 'john.smith@example.com',
                charity: 'Save the Kids',
                amount: 50
            },
            {
                date: '2024-06-10T08:15:00Z',
                name: 'Alice Tan',
                email: 'alice.tan@example.com',
                charity: 'Green Earth',
                amount: 80
            }
        ]);
    }, []);

    const filteredDonations = donations.filter((donation) => {
        const term = searchTerm.toLowerCase();
        return (
            donation.name.toLowerCase().includes(term) ||
            donation.charity.toLowerCase().includes(term)
        );
    });

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



