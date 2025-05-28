import React, { useState, useEffect } from 'react';
import DonationTable from '../components/DonationTable';
import Sidebar from '../../common/Sidebar';
// import axios from 'axios';

const DonationHistoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/donations')
            .then((res) => res.json())
            .then((data) => setDonations(data))
            .catch((err) => console.error('Failed to fetch data', err));
    }, []);

    const filteredDonations = donations.filter(donation =>
        donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '270px', flex: 1, padding: '2rem' }}>
                <h2 style={{ color: '#3366ff' }}>DONATIONS</h2>
                <p>All Donations History</p>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '300px' }}
                />
                <DonationTable donations={filteredDonations} />
            </div>
        </div>
    );
};

export default DonationHistoryPage;
