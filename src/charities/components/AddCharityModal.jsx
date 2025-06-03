import React, { useState } from 'react';

const AddCharityModal = ({ onClose, onCharityAdded }) => {
  const [formData, setFormData] = useState({
    charity_name: '',
    charity_description: '',
    charity_UEN: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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
    if (imageFile) {
      form.append('charity_image', imageFile);
    }

    try {
      const res = await fetch('http://localhost:5000/api/charities', {
        method: 'POST',
        body: form
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('❌ Backend error:', result);
        onCharityAdded(result.details || result.error || 'Unknown error occurred.');
        return;
      }

      onCharityAdded(); // No error
    } catch (err) {
      console.error('❌ Network error while adding charity:', err);
      onCharityAdded('Network error occurred. Please try again.');
    }
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalStyle}>
        <h2 style={modalHeader}>Add New Charity</h2>
        <form onSubmit={handleSubmit} style={formStyle} encType="multipart/form-data">
          <label style={labelStyle}>Charity Name</label>
          <input
            type="text"
            name="charity_name"
            value={formData.charity_name}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Description</label>
          <textarea
            name="charity_description"
            value={formData.charity_description}
            onChange={handleChange}
            style={textareaStyle}
            required
          />

          <label style={labelStyle}>UEN</label>
          <input
            type="text"
            name="charity_UEN"
            value={formData.charity_UEN}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Upload Image</label>
          <input
            type="file"
            name="charity_image"
            accept="image/*"
            onChange={handleFileChange}
            style={inputStyle}
          />

          <div style={buttonContainer}>
            <button type="submit" style={submitButton}>Submit</button>
            <button type="button" onClick={onClose} style={cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};




// Styles
const modalBackdropStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 999
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  width: '450px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
};

const modalHeader = {
  marginBottom: '1rem',
  textAlign: 'center',
  fontSize: '1.5rem',
  color: '#333'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '0.95rem',
  color: '#444'
};

const inputStyle = {
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '0.95rem'
};

const textareaStyle = {
  ...inputStyle,
  height: '80px',
  resize: 'vertical'
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1.5rem'
};

const submitButton = {
  backgroundColor: '#2f4cf5',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

const cancelButton = {
  backgroundColor: '#ccc',
  color: '#333',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};


export default AddCharityModal;
