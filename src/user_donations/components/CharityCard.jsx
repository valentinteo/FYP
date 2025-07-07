import React from 'react';

const CharityCard = ({ charity }) => {
  const imageUrl = charity.charity_image
    ? `http://localhost:5000/uploads/${charity.charity_image}`
    : '/placeholder.jpg';

  return (
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
        <div style={styles.tagWrapper}>
          {charity.charity_tags?.split(',').map((tag, index) => (
            <span key={index} style={styles.tag}>{tag.trim()}</span>
          ))}
        </div>
        <hr style={styles.divider} />
        <p style={styles.campaign}>
          {charity.charity_campaign_count || 0} campaign{charity.charity_campaign_count !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};


const styles = {
  card: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  content: {
    padding: 16,
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
  divider: {
    borderTop: '1px solid #eee',
    marginTop: 10,
    marginBottom: 5,
  },
  campaign: {
    fontSize: '0.85rem',
    color: '#444',
  },
};

export default CharityCard;
