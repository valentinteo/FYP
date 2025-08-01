import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import CharityTable from '../components/CharityTable';
import AddCharityModal from '../components/AddCharityModal';
import EditCharityModal from '../components/EditCharityModal';
import SearchBar from '../components/Searchbar';
import { toast } from 'react-toastify';

const CharityManagementPage = () => {
  const [charities, setCharities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
      method: 'GET',
      credentials: 'include', // ✅ Important: sends the session cookie
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        const role = (data.admin_role || data.role || '').toLowerCase();

        if (role !== 'superadmin' && role !== 'charity admin') {
          navigate('/unauthorized');
        } else {
          setAdminData(data);
          fetchCharities(); // ✅ Keep your original data fetch
        }
      })
      .catch((err) => {
        console.error('Session auth error:', err);
        navigate('/login');
      });
  }, [navigate]);

  const fetchCharities = () => {
    fetch('http://localhost:5000/api/charities')
      .then((res) => res.json())
      .then((data) => setCharities(data))
      .catch((err) => {
        console.error('❌ Failed to fetch charities:', err);
        toast.error('Error loading charities');
        setCharities([]);
      });
  };

  const handleCharityAdded = (error = null) => {
    setShowAddModal(false);
    if (error) {
      toast.error(`❌ Failed to add charity: ${error}`);
    } else {
      fetchCharities();
    }
  };

  const handleEdit = (charity) => {
    setEditingCharity(charity);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/charities/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(`❌ Failed to delete charity: ${result.details || result.error}`);
        return;
      }

      fetchCharities();
    } catch (err) {
      console.error('❌ Failed to delete charity:', err);
      toast.error('Network error while deleting charity');
    }
  };


  const handleEditSaved = () => {
    setEditingCharity(null);
    fetchCharities();
  };

  const filteredCharities = charities.filter((charity) =>
    (charity.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (charity.charity_UEN || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (adminData === null) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>MANAGE CHARITY ORGANIZATION</h2>
          {adminData.admin_role?.toLowerCase() === 'superadmin' && (
            <button
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
            >
              + Add New Charity
            </button>
          )}
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CharityTable charities={filteredCharities} onEdit={handleEdit} onDelete={handleDelete} />

        {showAddModal && (
          <AddCharityModal
            onClose={() => setShowAddModal(false)}
            onCharityAdded={handleCharityAdded}
          />
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
