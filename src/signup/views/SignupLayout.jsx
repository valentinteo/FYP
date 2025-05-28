import React from 'react';

const SignupLayout = ({ children }) => {
  return (
    <div style={styles.outer}>
      <div style={styles.inner}>
        <img
          src="yumtap.png"
          alt="YumTap Logo"
          style={styles.logo}
        />
        {children}
      </div>
    </div>
  );
};

const styles = {
  outer: {
    backgroundColor: '#0000FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5rem',
    borderRadius: '2rem',
    width: '600px',  
    margin: '5rem auto'
  },
  inner: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    width: '300px',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
    borderRadius: '50%',
  },
};

export default SignupLayout;
