import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    return (
        <form style={styles.form}>
            <label>Email:</label>
            <input type="email" placeholder="Enter Email" style={styles.input} />

            <label>Password:</label>
            <input type="password" placeholder="Enter password" style={styles.input} />

            <label>Confirm Password:</label>
            <input type="password" placeholder="Enter confirm password" style={styles.input} />

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
