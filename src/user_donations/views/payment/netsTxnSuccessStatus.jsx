import React from 'react';

const TransactionSuccessPage = ({ message = "Transaction Successful" }) => {
  return (
    <div className="container">
      <h1>{message}</h1>
      <p>Thank you for your payment!</p>
    </div>
  );
};

export default TransactionSuccessPage;
