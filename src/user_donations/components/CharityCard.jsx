import React from 'react';
import { Link } from 'react-router-dom';

const CharityCard = ({ charity }) => {
  const imageUrl = charity.charity_image
    ? `http://localhost:5000/uploads/${charity.charity_image}`
    : '/placeholder.jpg';

  return (
    <Link
      to={`/charity/${charity.charity_id}`} 
      style={styles.link}
    >
      <div style={styles.card}>
        <img
          src={imageUrl}
          alt={charity.charity_name}
          style={styles.image}
          onError={(e) => (e.target.src = '/placeholder.jpg')}
        />
        <div style={styles.content}>
          <h3 style={styles.name}>{charity.charity_name}</h3>
          <p style={styles.description}>
            {charity.charity_description.length > 200
              ? charity.charity_description.substring(0, 200) + '...'
              : charity.charity_description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    width: '100%',
    maxWidth: 350,
    height: '100%', // allow container to define height
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    minHeight: 420, // ✅ Make all cards the same height
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  content: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between', // ✅ Space out description and campaign count
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  description: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: 10,
    flexGrow: 1,
  },
  tagWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f1f3f5',
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: '0.8rem',
  },
};


export default CharityCard;
