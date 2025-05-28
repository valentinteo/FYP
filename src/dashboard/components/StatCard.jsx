import React from 'react';

const StatCard = ({ title, color, children }) => (
  <div style={{
    backgroundColor: color,
    color: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    flex: 1,
    margin: '0 0.5rem',
    textAlign: 'center',
  }}>
    <h4>{title}</h4>
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{children}</div>
  </div>
);

export default StatCard;
