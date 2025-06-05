// import React from 'react';
// import { Link } from 'react-router-dom';

// const SignupForm = () => {
//     return (
//         <form style={styles.form}>
//             <label>Email:</label>
//             <input type="email" placeholder="Enter Email" style={styles.input} />

//             <label>Password:</label>
//             <input type="password" placeholder="Enter password" style={styles.input} />

//             <label>Confirm Password:</label>
//             <input type="password" placeholder="Enter confirm password" style={styles.input} />

//             <button type="submit" style={styles.button}>Sign Up</button>

//             <p>
//                 Have an account? <Link to="/login">Login</Link>
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
//         textAlign: 'center',
//     }
// };

// export default SignupForm;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const phone = e.target[2].value;
        const password = e.target[3].value;
        const confirmPassword = e.target[4].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                admin_name: name,
                admin_email: email,
                admin_phone: phone,
                admin_password: password
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Signup successful');
            navigate('/login');
        } else {
            alert(data.error || 'Signup failed');
        }
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder="Enter Name" style={styles.input} required />

            <label>Email:</label>
            <input type="email" placeholder="Enter Email" style={styles.input} required />

            <label>Phone:</label>
            <input type="text" placeholder="Enter Phone Number" style={styles.input} required />

            <label>Password:</label>
            <input type="password" placeholder="Enter password" style={styles.input} required />

            <label>Confirm Password:</label>
            <input type="password" placeholder="Enter confirm password" style={styles.input} required />

            <button type="submit" style={styles.button}>Sign Up</button>

            <p>
                Have an account? <Link to="/login">Login</Link>
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
        textAlign: 'center',
    }
};

export default SignupForm;
