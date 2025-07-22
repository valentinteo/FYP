import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/Sidebar';

const ApproveAdminsPage = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/pending')
      .then(res => res.json())
      .then(data => setPendingAdmins(data))
      .catch(err => {
        console.error('Error fetching pending admins:', err);
        setPendingAdmins([]);
      });
  }, []);

  const handleApprove = (adminId) => {
    fetch(`http://localhost:5000/api/admin/approve/${adminId}`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(() => {
        setPendingAdmins(prev => prev.filter(admin => admin.admin_user_id !== adminId));
      })
      .catch(err => {
        console.error('Error approving admin:', err);
      });
  };

  const handleReject = (adminId) => {
    fetch(`http://localhost:5000/api/admin/reject/${adminId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setPendingAdmins(prev => prev.filter(admin => admin.admin_user_id !== adminId));
      })
      .catch(err => {
        console.error('Error rejecting admin:', err);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '2rem', marginLeft: '260px' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Approve Admin Accounts
            </h2>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            Only SuperAdmins can approve new admin registrations.
          </p>

          {pendingAdmins.length === 0 ? (
            <p>No pending admin registrations.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#2c52ed', color: 'white' }}>
                  <tr>
                    <th style={thStyle}>#ID</th>
                    <th style={thStyle}>Admin Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Mobile No.</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Created Date</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAdmins.map((admin, index) => (
                    <tr key={admin.admin_user_id} style={index % 2 === 0 ? rowEven : rowOdd}>
                      <td style={tdStyle}>{admin.admin_user_id}</td>
                      <td style={tdStyle}>{admin.admin_name}</td>
                      <td style={tdStyle}>{admin.admin_email}</td>
                      <td style={tdStyle}>{admin.admin_phone}</td>
                      <td style={tdStyle}>{admin.admin_role}</td>
                      <td style={tdStyle}>{new Date(admin.admin_created_date_time).toLocaleString()}</td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleApprove(admin.admin_user_id)}
                          style={approveButtonStyle}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(admin.admin_user_id)}
                          style={rejectButtonStyle}
                        >
                          Reject
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
    </div>
  );
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

const rowEven = {
  backgroundColor: '#fff',
};

const rowOdd = {
  backgroundColor: '#f9f9f9',
};

const approveButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginRight: '6px'
};

const rejectButtonStyle = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default ApproveAdminsPage;
