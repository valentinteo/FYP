import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/Sidebar';
import CharityTable from '../components/CharityTable';
import AddCharityModal from '../components/AddCharityModal';
import EditCharityModal from '../components/EditCharityModal'; 

const CharityManagementPage = () => {
  const [charities, setCharities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null); 

  const fetchCharities = () => {
    fetch('http://localhost:5000/api/charities')
      .then((res) => res.json())
      .then((data) => setCharities(data))
      .catch((err) => {
        console.error('Failed to fetch charities:', err);
        setCharities([]);
      });
  };

  useEffect(() => {
    fetchCharities();
  }, []);

  const handleCharityAdded = () => {
    setShowAddModal(false);
    fetchCharities();
  };

  const handleEdit = (charity) => {
    setEditingCharity(charity);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this charity?');
    if (!confirm) return;

    try {
      await fetch(`http://localhost:5000/api/charities/${id}`, {
        method: 'DELETE',
      });
      fetchCharities();
    } catch (err) {
      console.error('Failed to delete charity:', err);
      alert('Failed to delete charity');
    }
  };

  const handleEditSaved = () => {
    setEditingCharity(null);
    fetchCharities();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>MANAGE CHARITY ORGANIZATION</h2>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
          >
            + Add New Charity
          </button>
        </div>

        <button style={{ backgroundColor: '#ccc', padding: '0.5rem 1rem', margin: '1rem 0' }}>
          Date Added
        </button>

        <CharityTable charities={charities} onEdit={handleEdit} onDelete={handleDelete} />

        {showAddModal && (
          <AddCharityModal onClose={() => setShowAddModal(false)} onCharityAdded={handleCharityAdded} />
        )}

        {editingCharity && (
          <EditCharityModal
            charity={editingCharity}
            onClose={() => setEditingCharity(null)}
            onUpdated={handleEditSaved}
          />
        )}
      </div>
    </div>
  );
};

export default CharityManagementPage;

