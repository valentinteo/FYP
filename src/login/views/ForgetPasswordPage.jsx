// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgetPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/reset-password', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ admin_email: email, new_password: newPassword })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Password reset successful');
//         navigate('/login');
//       } else {
//         alert(data.error || 'Reset failed');
//       }
//     } catch (err) {
//       alert('Error resetting password: ' + err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleReset} style={styles.form}>
//       <h2>Reset Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         style={styles.input}
//       />
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//         style={styles.input}
//       />
//       <button type="submit" style={styles.button}>Reset Password</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//     maxWidth: '400px',
//     margin: '3rem auto',
//     padding: '2rem',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '8px',
//   },
//   input: {
//     padding: '0.8rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '0.8rem',
//     backgroundColor: '#0000FF',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   }
// };

// export default ForgetPasswordPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgetPasswordPage = () => {
//   const [email, setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/admin/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           admin_email: email,
//           admin_password: newPassword
//         })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Password reset successful');
//         navigate('/login');
//       } else {
//         alert(data.error || 'Reset failed');
//       }
//     } catch (err) {
//       alert('Error resetting password: ' + err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleReset} style={styles.form}>
//       <h2>Reset Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         style={styles.input}
//       />
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//         style={styles.input}
//       />
//       <button type="submit" style={styles.button}>Reset Password</button>
//     </form>
//   );
// };

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//     maxWidth: '400px',
//     margin: '3rem auto',
//     padding: '2rem',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '8px',
//   },
//   input: {
//     padding: '0.8rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '0.8rem',
//     backgroundColor: '#0000FF',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   }
// };

// export default ForgetPasswordPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_email: email,
          new_password: newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password reset successful');
        navigate('/login');
      } else {
        alert(data.error || 'Reset failed');
      }
    } catch (err) {
      alert('Error resetting password: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleReset} style={styles.form}>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Reset Password</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#0000FF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default ForgetPasswordPage;
