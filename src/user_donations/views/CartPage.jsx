import React, { useEffect, useState } from 'react';
import Navbar from '../../user_donations/components/Navbar';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/cart', {
            method: 'GET',
            credentials: 'include', // ✅ send session cookie
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.cart) {
                    setCartItems(data.cart);
                } else {
                    setCartItems([]);
                }
            })
            .catch((err) => console.error('Error loading cart:', err));
    }, []);

    return (
        <>
            <Navbar />
            <div style={pageWrapper}>
                <h2 style={heading}>Your Donation Cart</h2>

                {cartItems.length === 0 ? (
                    <p style={emptyText}>No donations in cart.</p>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>#</th>
                                <th style={thStyle}>Charity ID</th>
                                <th style={thStyle}>Amount ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{index + 1}</td>
                                    <td style={tdStyle}>{item.charity_id}</td>
                                    <td style={tdStyle}>{item.donation_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

// === Styles ===
const pageWrapper = {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto'
};

const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
};

const emptyText = {
    fontSize: '16px',
    color: '#777'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
};

const thStyle = {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #ccc',
    backgroundColor: '#f9f9f9'
};

const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee'
};

export default CartPage;
