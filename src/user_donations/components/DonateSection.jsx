import React from 'react';
import { FaSearch } from 'react-icons/fa';

const DonateSection = ({ searchTerm, setSearchTerm }) => {
  const [activeTab, setActiveTab] = React.useState('charities');

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Donate today</h1>
      <p style={styles.subtitle}>
        Transform lives and communities through giving. Let your donations make meaningful differences today.
      </p>

      <div style={styles.searchWrapper}>
        <label htmlFor="search" style={styles.searchLabel}>Search charities</label>
        <div style={styles.searchBar}>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a charity"
            style={styles.input}
          />
          <button style={styles.searchButton}>
            <FaSearch color="#fff" />
          </button>
        </div>
      </div>

      <div style={styles.tabs}>
        <span
          style={{
            ...styles.tab,
            ...(activeTab === 'charities' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('charities')}
        >
          CHARITIES
        </span>
        <span
          style={{
            ...styles.tab,
            ...(activeTab === 'campaigns' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('campaigns')}
        >
          CAMPAIGNS
        </span>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '60px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
    color: '#3a3f4b',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#5c6169',
    marginBottom: '40px',
  },
  searchWrapper: {
    marginBottom: '30px',
  },
  searchLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  searchBar: {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '6px',
    overflow: 'hidden',
    width: '100%',
  },
  input: {
    flex: 1,
    padding: '14px',
    fontSize: '1rem',
    border: 'none',
    outline: 'none',
  },
  searchButton: {
    backgroundColor: '#e65d6e',
    padding: '0 20px',
    border: 'none',
    cursor: 'pointer',
  },
  tabs: {
    display: 'flex',
    gap: '20px',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  tab: {
    cursor: 'pointer',
    color: '#9ea1a6',
    paddingBottom: '2px',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    color: '#1c1f26',
    borderColor: '#1c1f26',
  },
};

export default DonateSection;
