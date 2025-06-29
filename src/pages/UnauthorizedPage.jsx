import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin');
    if (stored) {
      const admin = JSON.parse(stored);
      if (admin?.admin?.admin_role === 'charity') {
        setRedirectPath('/charity');
      } else if (admin?.admin?.admin_role === 'tax') {
        setRedirectPath('/tax-deduction');
      }
    }
  }, []);

  const handleRedirect = () => {
    if (redirectPath) {
      navigate(redirectPath);
    } else {
      navigate('/dashboard'); // fallback
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
      <button
        onClick={handleRedirect}
        style={{
          marginTop: '1rem',
          backgroundColor: '#0047AB',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default UnauthorizedPage;
