// import React from 'react';

// const StatCard = ({ title, color, children }) => (
//   <div style={{
//     backgroundColor: color,
//     color: '#fff',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     flex: 1,
//     margin: '0 0.5rem',
//     textAlign: 'center',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     minWidth: '250px'
//   }}>
//     <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', letterSpacing: '0.5px' }}>{title}</h4>
//     <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{children}</div>
//   </div>
// );

// export default StatCard;


import React from 'react';

const StatCard = ({ title, color, children }) => (
  <div style={{
    backgroundColor: color,
    color: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '130px',
    width: '100%', // Let parent control width equally
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}>
    <h4 style={{
      marginBottom: '1rem',
      fontSize: '1.1rem',
      letterSpacing: '0.5px'
    }}>
      {title}
    </h4>
    <div style={{
      fontSize: '2rem',
      fontWeight: 'bold'
    }}>
      {children}
    </div>
  </div>
);

export default StatCard;
