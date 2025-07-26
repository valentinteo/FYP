import React, { useEffect, useState } from 'react';
import Navbar from '../../user_donations/components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const fetchCart = () => {
        fetch('http://localhost:5000/api/cart', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => setCartItems(data.cart || []))
            .catch((err) => console.error('Error loading cart:', err));
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdate = async (cartId, newAmount) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ cartDonationQuantity: newAmount }),
            });

            if (res.ok) {
                toast('✅ Donation amount updated');
                fetchCart();
            } else {
                toast('❌ Failed to update donation');
            }
        } catch (err) {
            console.error('Update error:', err);
            toast('❌ Something went wrong while updating');
        }
    };

    const handleDelete = async (cartId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.ok) {
                toast('🗑️ Charity deleted from cart');
                setCartItems(cartItems.filter(item => item.cartId !== cartId));
            } else {
                toast('❌ Failed to delete item');
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast('❌ Something went wrong while deleting');
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((sum, item) => {
            const quantity = parseFloat(item.cartDonationQuantity || 0);
            return sum + quantity;
        }, 0).toFixed(2);
    };

    const handlePay = () => {
        const total = getCartTotal();
        navigate('/payment/nets-qr', { state: { cartTotal: total } });
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div style={pageWrapper}>
                <h2 style={heading}>Your Donation Cart</h2>

                {cartItems.length === 0 ? (
                    <p style={emptyText}>No donations in cart.</p>
                ) : (
                    <>
                        <div style={cardContainer}>
                            {cartItems.map((item, index) => (
                                <div key={index} style={cardStyle}>
                                    <img
                                        src={`http://localhost:5000/uploads/${item.charity?.charity_image}`}
                                        alt={item.charity?.charity_name}
                                        style={imageStyle}
                                    />
                                    <div style={infoStyle}>
                                        <h3 style={charityName}>{item.charity?.charity_name}</h3>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.cartDonationQuantity}
                                                onChange={(e) => {
                                                    const updatedItems = cartItems.map((cart) =>
                                                        cart.cartId === item.cartId
                                                            ? { ...cart, cartDonationQuantity: e.target.value }
                                                            : cart
                                                    );
                                                    setCartItems(updatedItems);
                                                }}
                                                style={inputStyle}
                                            />
                                            <button onClick={() => handleUpdate(item.cartId, item.cartDonationQuantity)} style={updateBtn}>
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(item.cartId)} style={deleteBtn}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* React-Router based Payment Button */}
                        <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <h3>Pay with NETS</h3>
                            <p>Total Amount: ${getCartTotal()}</p>
                            <button onClick={handlePay} style={netsBtn}>
                                Make Payment
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// === Styles ===
const pageWrapper = { padding: '2rem', maxWidth: '900px', margin: '0 auto' };
const heading = { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' };
const emptyText = { fontSize: '16px', color: '#777' };
const cardContainer = { display: 'flex', flexDirection: 'column', gap: '20px' };
const cardStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
};
const imageStyle = {
    width: '150px',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '8px',
    marginRight: '20px',
    border: '1px solid #ddd',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const infoStyle = { display: 'flex', flexDirection: 'column', flexGrow: 1 };
const charityName = { fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' };
const inputStyle = {
    width: '100px',
    padding: '6px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc'
};
const updateBtn = {
    padding: '6px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};
const deleteBtn = {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};
const netsBtn = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#0070BA',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
};

export default CartPage;
