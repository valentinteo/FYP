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
