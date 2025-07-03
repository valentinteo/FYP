import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const { admin_role } = location.state || {};

    if (admin_role === 'charity') {
      setRedirectPath('/charity');
    } else if (admin_role === 'tax') {
      setRedirectPath('/tax-deduction');
    }
  }, [location.state]);

  const handleRedirect = () => {
    if (redirectPath) {
      navigate(redirectPath, { state: location.state });
    } else {
      navigate('/dashboard', { state: location.state });
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
