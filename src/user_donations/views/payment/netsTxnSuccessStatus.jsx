// import React from 'react';

// const TransactionSuccessPage = ({ message = "Transaction Successful" }) => {
//   return (
//     <div className="container">
//       <h1>{message}</h1>
//       <p>Thank you for your payment!</p>
//     </div>
//   );
// };

// export default TransactionSuccessPage;



import React, { useEffect } from 'react';

const TransactionSuccessPage = ({ message = "Transaction Successful" }) => {
    useEffect(() => {
        const clearCart = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/cart/clear', {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (!res.ok) {
                    console.error('❌ Failed to clear cart');
                } else {
                    console.log('🛒 Cart cleared successfully');
                }
            } catch (error) {
                console.error('❌ Error clearing cart:', error);
            }
        };

        clearCart();
    }, []);

    return (
        <div className="container">
            <h1>{message}</h1>
            <p>Thank you for your payment!</p>
            <a href="/cart">Back To Cart</a>
        </div>
    );
};

export default TransactionSuccessPage;


// import React, { useEffect } from 'react';

// const TransactionSuccessPage = ({ message = "Transaction Successful" }) => {
//   useEffect(() => {
//     const handleSuccess = async () => {
//       try {
//         console.log('🔁 Starting transaction success flow...');

//         // 1️⃣ Get cart
//         const cartRes = await fetch('http://localhost:5000/api/cart', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!cartRes.ok) {
//           console.error('❌ Failed to retrieve cart');
//           return;
//         }

//         const cartItems = await cartRes.json();
//         console.log('📦 Cart items:', cartItems);

//         // 2️⃣ Loop and insert donation records
//         for (const item of cartItems) {
//           const donationPayload = {
//             donation_order_id: null,
//             donation_charity_id: item.cartCharityId,
//             donation_amount: item.cartDonationQuantity,
//             donation_mode: 'NETS QR',
//             donation_is_tax_deductible: true,
//             donation_tax_deductible_amount: parseFloat(item.cartDonationQuantity) * 0.25,
//           };

//           console.log('📤 Sending donation payload:', donationPayload);

//           const donationRes = await fetch('http://localhost:5000/api/donation', {
//             method: 'POST',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(donationPayload),
//           });

//           const responseText = await donationRes.text();
//           console.log('📥 Donation API response:', responseText);

//           if (!donationRes.ok) {
//             console.error('❌ Donation insert failed');
//           } else {
//             console.log('✅ Donation inserted');
//           }
//         }

//         // 3️⃣ Clear cart
//         console.log('🗑️ Attempting to clear cart...');
//         const clearRes = await fetch('http://localhost:5000/api/cart/clear', {
//           method: 'DELETE',
//           credentials: 'include',
//         });

//         const clearText = await clearRes.text();
//         console.log('🧹 Clear cart response:', clearText);

//         if (!clearRes.ok) {
//           console.error('❌ Failed to clear cart');
//         } else {
//           console.log('✅ Cart cleared successfully');
//         }

//       } catch (error) {
//         console.error('❌ Error processing success flow:', error);
//       }
//     };

//     handleSuccess();
//   }, []);

//   return (
//     <div className="container">
//       <h1>{message}</h1>
//       <p>Thank you for your payment!</p>
//       <a href="/cart">Back To Cart</a>
//     </div>
//   );
// };

// export default TransactionSuccessPage;

