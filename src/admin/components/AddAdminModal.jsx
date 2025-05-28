import React from 'react';

const AddAdminModal = ({ formData, onChange, onSubmit, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3>Add New Admin</h3>
        <input name="admin_name" placeholder="Name" value={formData.admin_name} onChange={onChange} />
        <input name="admin_email" placeholder="Email" value={formData.admin_email} onChange={onChange} />
        <input name="admin_phone" placeholder="Phone" value={formData.admin_phone} onChange={onChange} />
        <input name="admin_password" type="password" placeholder="Password" value={formData.admin_password} onChange={onChange} />
        <input name="admin_role" placeholder="Role (e.g. superadmin)" value={formData.admin_role} onChange={onChange} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ background: 'gray', color: 'white', padding: '0.5rem 1rem' }}>
            Cancel
          </button>
          <button onClick={onSubmit} style={{ background: 'green', color: 'white', padding: '0.5rem 1rem' }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
