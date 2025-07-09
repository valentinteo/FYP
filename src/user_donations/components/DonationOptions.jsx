import React, { useState } from 'react';

const DonationOptions = ({ charity }) => {
    console.log("Charity passed into DonationOptions:", charity);
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalAmount, setModalAmount] = useState(0);

    const presetAmounts = [10, 60, 120, 220];

    const handleDonateNow = (amount) => {
        setModalAmount(amount);
        setShowModal(true);
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
                                <button style={styles.donateBtn} onClick={() => handleDonateNow(amount)}>Donate now</button>
                                <button style={styles.secondaryBtn}>Add to cart</button>
                            </div>
                        )}
                    </div>
                    <p style={styles.thankyou}>Thank you for donating {amount} dollars.</p>
                </div>
            ))}

            <div style={styles.card}>
                <div style={styles.cardTop}>
                    <span style={styles.dollar}>$</span>
                    <input
                        type="number"
                        placeholder="Custom"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        style={styles.input}
                    />
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2 style={styles.modalTitle}>
                            I want to donate to <span style={{ color: '#f66', fontWeight: 'bold' }}>
                                {charity && charity.charity_name ? charity.charity_name : 'a selected charity'}
                            </span>
                        </h2>
                        <p style={styles.modalText}>
                            Donations above $10 are eligible for claiming tax deduction.
                            To enjoy this benefit, please sign up and/or login to make the donation.
                            Guest donations are capped at $10,000.
                        </p>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Donation amount<span style={{ color: 'darkred' }}>*</span>
                            </label>
                            <div style={styles.amountInputWrapper}>
                                <span style={styles.dollar}>$</span>
                                <input
                                    type="number"
                                    value={modalAmount}
                                    onChange={(e) => setModalAmount(e.target.value)}
                                    style={styles.modalInput}
                                />
                            </div>
                        </div>

                        <div style={styles.modalButtons}>
                            <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
                            <button style={styles.confirmBtn}>Donate now</button>
                        </div>
                    </div>
                </div>
            )}
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

    // Modal styles
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    modalText: {
        fontSize: '1rem',
        marginBottom: '1.5rem',
        color: '#444',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        fontWeight: '600',
        color: '#343a40',
        display: 'block',
        marginBottom: '0.4rem',
        fontSize: '1rem',
    },

    amountInputWrapper: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #dc3545', // red border like shown
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '320px',
        backgroundColor: '#fff',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    },

    modalInput: {
        flex: 1,
        border: 'none',
        padding: '0.6rem 0.8rem',
        fontSize: '1rem',
        outline: 'none',
        color: '#212529',
    },

    dollar: {
        backgroundColor: '#f8f9fa',
        padding: '0.6rem 0.75rem',
        borderRight: '1px solid #ccc',
        color: '#495057',
        fontWeight: 'bold',
        fontSize: '1rem',
    },

    modalButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1rem',
    },
    cancelBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '20px',
        cursor: 'pointer',
    },
    confirmBtn: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#f66',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
    },

};

export default DonationOptions;
