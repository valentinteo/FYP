import React, { useState } from 'react';
import UserTable from '../components/AdminTable';
import Sidebar from '../../common/Sidebar';
import AddAdminModal from '../components/AddAdminModal';

const AdminUsersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_email: '',
    admin_phone: '',
    admin_password: '',
    admin_role: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Admin added successfully');
        setShowModal(false);
        window.location.reload();
      } else {
        alert('Failed to add admin');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>User List</h2>
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            + Add New User
          </button>
        </div>

        <input
          type="text"
          placeholder="Search"
          style={{
            margin: '1rem 0',
            padding: '0.5rem',
            width: '250px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        <UserTable />
      </div>

      {showModal && (
        <AddAdminModal
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleAddAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
