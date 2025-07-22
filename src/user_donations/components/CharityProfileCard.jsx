import React, { useState } from 'react';
import {
  FaFacebook,
  FaPhone,
  FaShareAlt,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const CharityProfileCard = ({ charity }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const shareUrl = `${window.location.origin}/charity/${charity.charity_id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied!');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src={
              charity.charity_image
                ? `http://localhost:5000/uploads/${charity.charity_image}`
                : '/placeholder.jpg'
            }
            alt={charity.charity_name}
            style={styles.logo}
          />

          <div style={styles.info}>
            <h2 style={styles.name}>{charity.charity_name}</h2>
            <div style={styles.icons}>
              <FaFacebook style={styles.icon} />
              <FaPhone style={styles.icon} />
            </div>
            {charity.charity_website && (
              <a
                href={charity.charity_website}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {charity.charity_website}
              </a>
            )}
          </div>

          <div style={styles.shareButton} onClick={() => setShowShareModal(true)}>
            <FaShareAlt />
          </div>
        </div>

        {showShareModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <button style={styles.closeButton} onClick={() => setShowShareModal(false)}>×</button>
              <h3>Share</h3>
              <p>Copy and share this page with your community and friends.</p>
              <div style={styles.socialRow}>
                <FaFacebook style={{ ...styles.socialIcon, color: '#1877F2' }} />
                <FaLinkedin style={{ ...styles.socialIcon, color: '#0077B5' }} />
                <FaWhatsapp style={{ ...styles.socialIcon, color: '#25D366' }} />
                <FaTelegram style={{ ...styles.socialIcon, color: '#0088CC' }} />
              </div>
              <div style={styles.inputWrapper}>
                <input type="text" value={shareUrl} readOnly style={styles.input} />
                <button style={styles.copyButton} onClick={copyToClipboard}>Copy link</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.aboutBox}>
        <h3 style={styles.aboutTitle}>About</h3>
        <p style={styles.aboutText}>{charity.charity_description}</p>
        {charity.charity_website && (
          <p style={styles.aboutText}>
            For more information, visit{' '}
            <a href={charity.charity_website} target="_blank" rel="noopener noreferrer">
              {charity.charity_website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    gap: '1.5rem',
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    borderRadius: '50%',
    border: '1px solid #ccc',
  },
  info: {
    flex: 1,
  },
  name: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  icons: {
    marginTop: '0.5rem',
    display: 'flex',
    gap: '1rem',
    fontSize: '1.2rem',
    color: '#333',
  },
  icon: {
    cursor: 'pointer',
  },
  link: {
    display: 'block',
    marginTop: '0.5rem',
    color: '#337ab7',
    textDecoration: 'none',
  },
  shareButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '2rem',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: '1.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  socialRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: '1rem 0',
    fontSize: '1.5rem',
  },
  socialIcon: {
    cursor: 'pointer',
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minWidth: '220px',
  },
  copyButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f66',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  aboutBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '1.5rem 2rem',
    maxWidth: '960px',
    width: '100%',
    boxShadow: '0 1px 5px rgba(0,0,0,0.05)',
  },
  aboutTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  aboutText: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '0.5rem',
  },
};

export default CharityProfileCard;
