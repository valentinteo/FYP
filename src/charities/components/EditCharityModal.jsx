import React, { useState } from 'react';
import { toast } from 'react-toastify';

const EditCharityModal = ({ charity, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    charity_name: charity.charity_name,
    charity_description: charity.charity_description,
    charity_UEN: charity.charity_UEN,
    is_charity_featured: charity.is_charity_featured || false
  });


  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('charity_name', formData.charity_name);
    form.append('charity_description', formData.charity_description);
    form.append('charity_UEN', formData.charity_UEN);
    form.append('is_charity_featured', formData.is_charity_featured ? 1 : 0); // convert to 0/1

    if (imageFile) {
      form.append('charity_image', imageFile);
    }

    try {
      await fetch(`http://localhost:5000/api/charities/${charity.charity_id}`, {
        method: 'PUT',
        body: form,
      });

      onUpdated();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update charity.');
    }
  };

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h2 style={header}>✏️ Edit Charity</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={form}>
          <label style={label}>Charity Name</label>
          <input type="text" name="charity_name" value={formData.charity_name} onChange={handleChange} style={input} required />

          <label style={label}>Description</label>
          <textarea name="charity_description" value={formData.charity_description} onChange={handleChange} style={textarea} required />

          <label style={label}>UEN</label>
          <input type="text" name="charity_UEN" value={formData.charity_UEN} onChange={handleChange} style={input} />

          <label style={label}>Replace Image</label>
          <input type="file" name="charity_image" accept="image/*" onChange={handleFileChange} style={fileInput} />
          <label style={label}>
            <input
              type="checkbox"
              name="is_charity_featured"
              checked={formData.is_charity_featured}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_charity_featured: e.target.checked
                }))
              }
              style={{ marginRight: '8px' }}
            />
            Mark as Featured
          </label>
          <div style={buttonGroup}>
            <button type="submit" style={saveBtn}>💾 Save</button>
            <button type="button" onClick={onClose} style={cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🎨 Styles
const backdrop = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const modal = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  width: '500px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  fontFamily: 'Segoe UI, sans-serif'
};

const header = {
  marginBottom: '1.5rem',
  fontSize: '1.6rem',
  fontWeight: '600',
  textAlign: 'center'
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const label = {
  fontWeight: 'bold',
  fontSize: '0.9rem',
  color: '#333'
};

const input = {
  padding: '0.6rem',
  fontSize: '0.95rem',
  border: '1px solid #ccc',
  borderRadius: '6px'
};

const textarea = {
  ...input,
  minHeight: '80px',
  resize: 'vertical'
};

const fileInput = {
  padding: '0.4rem',
  fontSize: '0.9rem'
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1.2rem'
};

const saveBtn = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '0.6rem 1.4rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const cancelBtn = {
  backgroundColor: '#ccc',
  color: '#333',
  padding: '0.6rem 1.4rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default EditCharityModal;
