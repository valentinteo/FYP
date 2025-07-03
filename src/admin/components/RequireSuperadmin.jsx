import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RequireSuperadmin = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { admin_email, admin_password } = location.state || {};

    if (!admin_email || !admin_password) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email, admin_password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.admin_role === 'superadmin') {
          setAuthorized(true);
        } else {
          navigate('/unauthorized');
        }
      })
      .catch(err => {
        console.error('Superadmin check failed:', err);
        navigate('/login');
      })
      .finally(() => {
        setChecking(false);
      });
  }, [location.state, navigate]);

  if (checking) return <div>Checking permissions...</div>;
  if (!authorized) return null;

  return <>{children}</>;
};

export default RequireSuperadmin;
