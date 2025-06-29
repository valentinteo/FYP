import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/Sidebar';

const ApproveAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin'); // ✅ fixed here
    if (stored) {
      setAdminData(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (adminData?.admin_role === 'superadmin') {
      fetch('http://localhost:5000/api/admin/unapproved')
        .then((res) => res.json())
        .then((data) => setAdmins(data))
        .catch((err) => console.error('Error fetching unapproved admins:', err));
    }
  }, [adminData]);

  const handleApprove = async (id) => {
    const confirm = window.confirm('Are you sure you want to approve this admin?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
        method: 'PUT',
      });

      if (res.ok) {
        alert('Admin approved!');
        setAdmins(admins.filter((admin) => admin.admin_user_id !== id));
      } else {
        alert('Failed to approve admin.');
      }
    } catch (err) {
      console.error('Error approving admin:', err);
    }
  };

  if (adminData === null) {
    return <div>Loading...</div>;
  }

  if (adminData.admin_role !== 'superadmin') {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
        <h2>Admin Approval List</h2>
        {admins.length === 0 ? (
          <p>No unapproved admins.</p>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#0047AB', marginBottom: '1rem' }}>Unapproved Admins</h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
            }}>
              <thead style={{ background: '#2a3cff', color: 'white' }}>
                <tr>
                  <th style={{ padding: '10px' }}>#ID</th>
                  <th style={{ padding: '10px' }}>Admin Name</th>
                  <th style={{ padding: '10px' }}>Email</th>
                  <th style={{ padding: '10px' }}>Mobile No.</th>
                  <th style={{ padding: '10px' }}>Role</th>
                  <th style={{ padding: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.admin_user_id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{admin.admin_user_id}</td>
                    <td style={{ padding: '10px' }}>{admin.admin_name}</td>
                    <td style={{ padding: '10px' }}>{admin.admin_email}</td>
                    <td style={{ padding: '10px' }}>{admin.admin_phone}</td>
                    <td style={{ padding: '10px' }}>{admin.admin_role}</td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => handleApprove(admin.admin_user_id)}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveAdminsPage;
