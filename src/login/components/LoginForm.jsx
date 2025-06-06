// import React from 'react';
// import { Link } from 'react-router-dom';

// const LoginForm = () => {
//     return (
//         <form style={styles.form}>
//             <label>Email:</label>
//             <input type="email" placeholder="Enter Email" style={styles.input} />

//             <label>Password:</label>
//             <input type="password" placeholder="Enter Password" style={styles.input} />

//             <button type="submit" style={styles.button}>Login</button>

//             <p>
//                 Don't have an account? <Link to="/signup">Sign up</Link>
//             </p>
//         </form>
//     );
// };

// const styles = {
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         textAlign: 'left',
//     },
//     input: {
//         padding: '0.5rem',
//         backgroundColor: '#777',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//     },
//     button: {
//         backgroundColor: '#0000FF',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         padding: '0.5rem',
//         cursor: 'pointer',
//     },
//     linkText: {
//         marginTop: '1rem',
//         fontSize: '0.9rem',
//     }
// };

// export default LoginForm;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    admin_email: email,
                    admin_password: password
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Login successful');
                navigate('/dashboard'); // ✅ redirect to dashboard
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" placeholder="Enter Email" style={styles.input} />

            <label>Password:</label>
            <input type="password" placeholder="Enter Password" style={styles.input} />

            <button type="submit" style={styles.button}>Login</button>

            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </form>
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
        backgroundColor: '#0000FF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem',
        cursor: 'pointer',
    },
    linkText: {
        marginTop: '1rem',
        fontSize: '0.9rem',
    }
};

export default LoginForm;
