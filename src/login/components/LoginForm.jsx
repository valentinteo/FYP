import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_email: email,
          admin_password: password,
          user_email: email,
          user_password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');

        setTimeout(() => {
          if (data.admin_role) {
            navigate('/dashboard', {
              state: { admin_email: email, admin_password: password }
            });
          } else if (data.user_role) {
            navigate('/user-donations', {
              state: { user_email: email, user_password: password }
            });
          } else {
            toast.error('No role found');
          }
        }, 1500); // slight delay to show toast
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      toast.error('Login failed: ' + err.message);
    }
  };

  return (
    <>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" placeholder="Enter Email" style={styles.input} required />

        <label>Password:</label>
        <input type="password" placeholder="Enter Password" style={styles.input} required />

        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/signup">Sign up</Link> | <Link to="/forget-password">Forgot Password?</Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    textAlign: 'left',
  },
  input: {
    padding: '0.5rem',
    backgroundColor: '#777',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  button: {
    padding: '0.6rem',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  linkText: {
    fontSize: '0.9rem',
    textAlign: 'center',
  }
};

export default LoginForm;