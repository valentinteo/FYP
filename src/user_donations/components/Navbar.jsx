import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav style={styles.navWrapper}>
      {/* Top Row */}
      <div style={styles.topRow}>
        <div style={styles.logoWrapper}>
          <img
            src="/path/to/logo.png" // 🔁 Replace with actual logo path (e.g., /images/yumtap-logo.png)
            alt="YumTap Logo"
            style={styles.logoImage}
          />
          <span style={styles.logoText}>YumTap</span>
        </div>
        <div style={styles.rightLinks}>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/faq" style={styles.link}>FAQ</Link>
          <Link to="/apis" style={styles.link}>APIs</Link>
          <Link to="/contact" style={styles.link}>Contact us</Link>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF style={styles.icon} /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram style={styles.icon} /></a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok style={styles.icon} /></a>
        </div>
      </div>

      {/* Divider */}
      <hr style={styles.divider} />

      {/* Bottom Row */}
      <div style={styles.bottomRow}>
        <div style={styles.leftLinks}>
          <Link to="/donate" style={styles.link}>Donate</Link>
          <Link to="/volunteer" style={styles.link}>Volunteer</Link>
          <Link to="/collaborate" style={styles.link}>Collaborate</Link>
          <Link to="/fundraise" style={styles.link}>Fundraise</Link>
          <Link to="/organisations" style={styles.link}>Our organisations</Link>
          <Link to="/stories" style={styles.link}>Stories</Link>
        </div>
        <div style={styles.rightButtons}>
          <Link to="/login" style={styles.link}>Log in</Link>
          <Link to="/signup" style={styles.link}>Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navWrapper: {
    backgroundColor: '#1f3a68',
    color: '#fff',
    fontFamily: 'sans-serif',
    padding: '40px 20px',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImage: {
    height: '40px',
    width: '40px',
    objectFit: 'contain',
    borderRadius: '50%',
    backgroundColor: '#fff', // temporary placeholder bg
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  leftLinks: {
    display: 'flex',
    gap: '20px',
  },
  rightButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  icon: {
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  divider: {
    borderColor: '#426093',
    margin: '10px 0',
  },
};

export default Navbar;
