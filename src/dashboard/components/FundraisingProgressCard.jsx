import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { toast } from 'react-toastify';

const FundraisingProgressCard = () => {
  const [progress, setProgress] = useState('--');
  const [totalDonations, setTotalDonations] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const [fundraisingList, setFundraisingList] = useState([]);
  const [charities, setCharities] = useState([]);
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
      .then(data => setProgress(data.progress || '--%'))
      .catch(() => setProgress('--%'));
    // Fetch ongoing campaigns
    fetch('http://localhost:5000/api/fundraising/ongoing')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setFundraisingList([]);
          setFundraising({
            fundraising_id: '',
            fundraising_title: '',
            fundraising_description: '',
            fundraising_goal_amount: '',
            fundraising_start_datetime: '',
            fundraising_end_datetime: '',
            fundraising_charity_id: '',
          });
          return;
        }

        const today = new Date().setHours(0, 0, 0, 0);

        // Filter out expired campaigns
        const validCampaigns = data.filter(c => {
          const endDate = new Date(c.fundraising_end_datetime).setHours(0, 0, 0, 0);
          return endDate >= today;
        });

        // Delete expired ones
        const expiredCampaigns = data.filter(c => {
          const endDate = new Date(c.fundraising_end_datetime).setHours(0, 0, 0, 0);
          return endDate < today;
        });

        expiredCampaigns.forEach(campaign => {
          fetch(`http://localhost:5000/api/fundraising/${campaign.fundraising_id}`, {
            method: 'DELETE',
          })
            .then(() => {
              toast.info(`🗑️ Expired campaign "${campaign.fundraising_title}" deleted.`);
            })
            .catch(() => {
              toast.error(`❌ Failed to delete expired campaign "${campaign.fundraising_title}".`);
            });
        });

        if (validCampaigns.length > 0) {
          const first = validCampaigns[0];
          setFundraisingList(validCampaigns);
          setFundraising({
            ...first,
            fundraising_start_datetime: formatDate(first.fundraising_start_datetime),
            fundraising_end_datetime: formatDate(first.fundraising_end_datetime),
          });
        } else {
          setFundraisingList([]);
          setFundraising({
            fundraising_id: '',
            fundraising_title: '',
            fundraising_description: '',
            fundraising_goal_amount: '',
            fundraising_start_datetime: '',
            fundraising_end_datetime: '',
            fundraising_charity_id: '',
          });
        }
      });

    // Fetch total donations
    fetch('http://localhost:5000/api/donations/total')
      .then(res => res.json())
      .then(data => setTotalDonations(data.total_donations || 0));
  }, []);


  useEffect(() => {
    fetch('http://localhost:5000/api/charities')
      .then(res => res.json())
      .then(data => setCharities(data));
  }, []);

  const handleChange = (e) => {
    setFundraising({ ...fundraising, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const goalAmount = parseFloat(fundraising.fundraising_goal_amount);
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(fundraising.fundraising_start_datetime).setHours(0, 0, 0, 0);
    const endDate = new Date(fundraising.fundraising_end_datetime).setHours(0, 0, 0, 0);

    if (goalAmount < totalDonations) {
      toast.error(`❌ Goal cannot be lower than total donations ($${totalDonations.toFixed(2)})`);
      return;
    }

    if (mode === 'add' && startDate < today) {
      toast.error("❌ Start date cannot be in the past.");
      return;
    }


    if (endDate < today) {
      toast.error("❌ End date cannot be in the past.");
      return;
    }

    if (endDate < startDate) {
      toast.error("❌ End date cannot be before start date.");
      return;
    }

    const url =
      mode === 'edit'
        ? 'http://localhost:5000/api/fundraising/update'
        : 'http://localhost:5000/api/fundraising/add';

    const method = mode === 'edit' ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fundraising),
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
        return res.json();
      })
      .then(() => {
        toast.success(`🎉 Fundraising ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
        setIsModalOpen(false);
        setMode('view');
      })
      .catch(() => toast.error(`❌ Failed to ${mode === 'edit' ? 'update' : 'create'} fundraising.`));
  };


  const handleAddMode = () => {
    setFundraising({
      fundraising_id: '',
      fundraising_title: '',
      fundraising_description: '',
      fundraising_goal_amount: '',
      fundraising_start_datetime: '',
      fundraising_end_datetime: '',
    });
    setMode('add');
  };

  return (
    <>
      <div
        onClick={() => {
          fetch('http://localhost:5000/api/fundraising/ongoing')
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data) && data.length > 0) {
                const first = data[0];
                setFundraising({
                  ...first,
                  fundraising_start_datetime: formatDate(first.fundraising_start_datetime),
                  fundraising_end_datetime: formatDate(first.fundraising_end_datetime),
                });
              }
              setIsModalOpen(true);
            })
            .catch(err => {
              console.error('Error fetching fundraising:', err);
              setIsModalOpen(true);
            });
        }}
        style={{ cursor: 'pointer' }}
      >

        <StatCard title="FUNDRAISING TARGET PROGRESS" color="#facc15">
          {progress}
        </StatCard>
      </div>
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            {mode === 'view' && (
              <>
                {fundraisingList.length > 1 && (
                  <select
                    value={fundraising.fundraising_id}
                    onChange={(e) => {
                      const selected = fundraisingList.find(
                        (f) => f.fundraising_id === parseInt(e.target.value)
                      );
                      if (selected) {
                        setFundraising({
                          ...selected,
                          fundraising_start_datetime: formatDate(selected.fundraising_start_datetime),
                          fundraising_end_datetime: formatDate(selected.fundraising_end_datetime),
                        });
                      }
                    }}
                  >
                    {fundraisingList.map((f) => (
                      <option key={f.fundraising_id} value={f.fundraising_id}>
                        {f.fundraising_title}
                      </option>
                    ))}
                  </select>
                )}

                <h2
                  style={{ cursor: 'pointer', color: '#1d4ed8' }}
                  onClick={() => setMode('edit')}
                >
                  {fundraising.fundraising_title || 'Untitled Campaign'}
                </h2>

                <button onClick={handleAddMode} style={modalStyles.button}>
                  Add Fundraising
                </button>
                <button onClick={() => setIsModalOpen(false)} style={modalStyles.closeButton}>
                  Close
                </button>
              </>
            )}

            {(mode === 'edit' || mode === 'add') && (
              <>
                <h2>{mode === 'edit' ? 'Edit Fundraising Campaign' : 'Add Fundraising Campaign'}</h2>

                {mode === 'add' && (
                  <>
                    <label>Charity</label>
                    <select
                      name="fundraising_charity_id"
                      value={fundraising.fundraising_charity_id}
                      onChange={handleChange}
                    >
                      <option value="">-- Select a charity --</option>
                      {charities.map((charity) => (
                        <option key={charity.charity_id} value={charity.charity_id}>
                          {charity.charity_name}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <label>Title</label>
                <input
                  name="fundraising_title"
                  value={fundraising.fundraising_title}
                  onChange={handleChange}
                />

                <label>Description</label>
                <textarea
                  name="fundraising_description"
                  value={fundraising.fundraising_description}
                  onChange={handleChange}
                />

                <label>Goal Amount</label>
                <input
                  name="fundraising_goal_amount"
                  type="number"
                  value={fundraising.fundraising_goal_amount}
                  onChange={handleChange}
                />

                <label>Start Date</label>
                <input
                  name="fundraising_start_datetime"
                  type="date"
                  value={fundraising.fundraising_start_datetime}
                  onChange={handleChange}
                />

                <label>End Date</label>
                <input
                  name="fundraising_end_datetime"
                  type="date"
                  value={fundraising.fundraising_end_datetime}
                  onChange={handleChange}
                />

                <div style={{ marginTop: '1rem' }}>
                  <button onClick={handleSave} style={modalStyles.button}>Save</button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setMode('view');
                    }}
                    style={modalStyles.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
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
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    maxWidth: '520px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  button: {
    backgroundColor: '#facc15',
    color: '#000',
    padding: '0.75rem 1.25rem',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
  },
  closeButton: {
    backgroundColor: '#d1d5db',
    color: '#111827',
    padding: '0.75rem 1.25rem',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
  },
};

