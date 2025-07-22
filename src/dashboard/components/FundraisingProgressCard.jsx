import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { toast } from 'react-toastify';

const FundraisingProgressCard = () => {
  const [progress, setProgress] = useState('--');
  const [totalDonations, setTotalDonations] = useState(0); // ✅ NEW
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundraising, setFundraising] = useState({
    fundraising_id: '',
    fundraising_title: '',
    fundraising_description: '',
    fundraising_goal_amount: '',
    fundraising_start_datetime: '',
    fundraising_end_datetime: '',
  });

  const formatDate = (dt) => {
    if (!dt) return '';
    return new Date(dt).toISOString().split('T')[0];
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/fundraising/progress')
      .then(res => res.json())
      .then(data => {
        setProgress(data.progress || '--%');
      })
      .catch(err => {
        console.error('Error fetching fundraising progress:', err);
        setProgress('--%');
      });

    fetch('http://localhost:5000/api/fundraising/latest')
      .then(res => res.json())
      .then(data => {
        setFundraising({
          ...data,
          fundraising_start_datetime: formatDate(data.fundraising_start_datetime),
          fundraising_end_datetime: formatDate(data.fundraising_end_datetime),
        });
      })
      .catch(err => console.error('Error fetching fundraising data:', err));

    // ✅ Fetch total donations
    fetch('http://localhost:5000/api/donations/total')
      .then(res => res.json())
      .then(data => {
        setTotalDonations(data.total_donations || 0); // ✅ use correct key
      })
      .catch(err => console.error('Error fetching total donations:', err));
  }, []);

  const handleChange = (e) => {
    setFundraising({
      ...fundraising,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const goalAmount = parseFloat(fundraising.fundraising_goal_amount);

    // ✅ Check if goal is less than total donations
    if (goalAmount < totalDonations) {
      toast.error(`❌ Goal cannot be lower than total donations ($${totalDonations.toFixed(2)})`);
      return;
    }

    fetch('http://localhost:5000/api/fundraising/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fundraising),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'Unknown error');
          });
        }
        return res.json();
      })
      .then(() => {
        toast.success('🎉 Fundraising updated successfully!');
        setIsModalOpen(false);
      })
      .catch(err => {
        console.error('🔴 Update failed:', err.message);
        toast.error('❌ Failed to update fundraising. Please try again.');
      });
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
        <StatCard title="FUNDRAISING TARGET PROGRESS" color="#facc15">
          {progress}
        </StatCard>
      </div>

      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Edit Fundraising Campaign</h2>

            <label>Title</label>
            <input name="fundraising_title" value={fundraising.fundraising_title} onChange={handleChange} />

            <label>Description</label>
            <textarea name="fundraising_description" value={fundraising.fundraising_description} onChange={handleChange} />

            <label>Goal Amount</label>
            <input name="fundraising_goal_amount" type="number" value={fundraising.fundraising_goal_amount} onChange={handleChange} />

            <label>Start Date</label>
            <input name="fundraising_start_datetime" type="date" value={fundraising.fundraising_start_datetime} onChange={handleChange} />

            <label>End Date</label>
            <input name="fundraising_end_datetime" type="date" value={fundraising.fundraising_end_datetime} onChange={handleChange} />

            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleSave} style={modalStyles.button}>Save</button>
              <button onClick={() => setIsModalOpen(false)} style={modalStyles.closeButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FundraisingProgressCard;

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  button: {
    backgroundColor: '#facc15',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginRight: '0.5rem'
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: '0.5rem 1rem',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};
