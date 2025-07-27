import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DonationOptions = ({ charity }) => {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);

    const navigate = useNavigate();
    const presetAmounts = [10, 60, 120, 220];
    const handleAddToCart = async (amount) => {
        if (!charity?.charity_id) return;

        try {
            const userRes = await fetch('http://localhost:5000/api/auth/me', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!userRes.ok) throw new Error('User not authenticated');

            const payload = {
                cartDonationQuantity: amount,
                cartCharityId: charity.charity_id
            };


            const cartRes = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (cartRes.ok) {
                toast('Donation added to cart!');
                navigate('/cart');
            } else {
                toast('Failed to add to cart');
            }
        } catch (err) {
            console.error('Add to cart error:', err);
            toast('Session expired or not logged in.');
        }
    };

    return (
        <div style={styles.wrapper}>
            <h3 style={styles.heading}>Make a difference</h3>
            <p style={styles.subtext}>
                You can customise your donation such as recurring or one-time later.
            </p>

            {presetAmounts.map((amount) => (
                <div
                    key={amount}
                    style={{
                        ...styles.card,
                        ...(selected === amount ? styles.cardSelected : {}),
                    }}
                    onClick={() => setSelected(amount)}
                    onMouseEnter={() => setHovered(amount)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div style={styles.cardTop}>
                        <span style={styles.dollar}>$</span>
                        <strong style={styles.amount}>{amount}</strong>
                        {hovered === amount && (
                            <div style={styles.actions}>
                                <button style={styles.secondaryBtn} onClick={() => handleAddToCart(amount)}>
                                    Add to cart
                                </button>
                            </div>
                        )}
                    </div>
                    <p style={styles.thankyou}>Thank you for donating {amount} dollars.</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    wrapper: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '2rem auto',
    },
    heading: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: '0.9rem',
        marginBottom: '1rem',
        color: '#555',
    },
    card: {
        backgroundColor: '#fff7f0',
        border: '1px solid #eee',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    cardSelected: {
        border: '2px solid #f66',
        backgroundColor: '#ffebdf',
    },
    cardTop: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        position: 'relative',
    },
    amount: {
        fontSize: '1.5rem',
    },
    thankyou: {
        marginTop: '0.5rem',
        fontSize: '0.9rem',
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
        position: 'absolute',
        right: 0,
    },
    donateBtn: {
        backgroundColor: '#f66',
        color: '#fff',
        border: 'none',
        borderRadius: '15px',
        padding: '0.3rem 0.8rem',
        cursor: 'pointer',
    },
    secondaryBtn: {
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #ccc',
        borderRadius: '15px',
        padding: '0.3rem 0.8rem',
        cursor: 'pointer',
    },
    input: {
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '0.2rem 0.5rem',
        width: '100px',
    },
};

export default DonationOptions;
