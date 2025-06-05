// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminList = () => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/admin')
//       .then(res => setAdmins(res.data))
//       .catch(err => console.error('Failed to fetch admins:', err));
//   }, []);

//   return (
//     <div style={{
//       backgroundColor: '#fff',
//       borderRadius: '12px',
//       padding: '2rem',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       overflowX: 'auto'
//     }}>
//       <h2 style={{ marginBottom: '1.5rem', color: '#2f4cf5' }}>Admin User List</h2>

//       <table style={{
//         width: '100%',
//         borderCollapse: 'collapse',
//         fontFamily: 'Segoe UI, sans-serif',
//         fontSize: '14px'
//       }}>
//         <thead style={{
//           backgroundColor: '#2f4cf5',
//           color: 'white',
//           textAlign: 'left'
//         }}>
//           <tr>
//             <th style={headerCell}>#ID</th>
//             <th style={headerCell}>Admin Name</th>
//             <th style={headerCell}>Email</th>
//             <th style={headerCell}>Mobile No.</th>
//             <th style={headerCell}>Created Date</th>
//             <th style={headerCell}>Role</th>
//             <th style={headerCell}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin, index) => (
//             <tr key={admin.admin_user_id} style={index % 2 === 0 ? rowEven : rowOdd}>
//               <td style={cell}>{admin.admin_user_id}</td>
//               <td style={cell}>{admin.admin_name}</td>
//               <td style={cell}>{admin.admin_email}</td>
//               <td style={cell}>{admin.admin_phone}</td>
//               <td style={cell}>{new Date(admin.admin_created_date_time).toLocaleString()}</td>
//               <td style={cell}>{admin.admin_role}</td>
//               <td style={cell}>
//                 <button style={actionBtn}>Edit</button>
//                 <button style={{ ...actionBtn, backgroundColor: '#e74c3c' }}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Style constants
// const headerCell = {
//   padding: '12px 16px',
//   fontWeight: '600'
// };

// const cell = {
//   padding: '12px 16px',
//   borderBottom: '1px solid #ddd'
// };

// const rowEven = {
//   backgroundColor: '#f9f9f9'
// };

// const rowOdd = {
//   backgroundColor: '#ffffff'
// };

// const actionBtn = {
//   marginRight: '8px',
//   padding: '6px 12px',
//   fontSize: '12px',
//   backgroundColor: '#2f4cf5',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer'
// };

// export default AdminList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminList = ({ onEdit }) => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = () => {
    axios.get('http://localhost:5000/api/admin')
      .then(res => setAdmins(res.data))
      .catch(err => console.error('Failed to fetch admins:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/${id}`);
        fetchAdmins(); // Refresh list after deletion
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div style={container}>
      <h2 style={title}>Admin User List</h2>
      <table style={table}>
        <thead style={thead}>
          <tr>
            <th style={headerCell}>#ID</th>
            <th style={headerCell}>Admin Name</th>
            <th style={headerCell}>Email</th>
            <th style={headerCell}>Mobile No.</th>
            <th style={headerCell}>Created Date</th>
            <th style={headerCell}>Role</th>
            <th style={headerCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.admin_user_id} style={index % 2 === 0 ? rowEven : rowOdd}>
              <td style={cell}>{admin.admin_user_id}</td>
              <td style={cell}>{admin.admin_name}</td>
              <td style={cell}>{admin.admin_email}</td>
              <td style={cell}>{admin.admin_phone}</td>
              <td style={cell}>{new Date(admin.admin_created_date_time).toLocaleString()}</td>
              <td style={cell}>{admin.admin_role}</td>
              <td style={cell}>
                <button style={actionBtn} onClick={() => onEdit(admin)}>Edit</button>
                <button style={{ ...actionBtn, backgroundColor: '#e74c3c' }} onClick={() => handleDelete(admin.admin_user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const container = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflowX: 'auto'
};

const title = {
  marginBottom: '1.5rem',
  color: '#2f4cf5'
};

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '14px'
};

const thead = {
  backgroundColor: '#2f4cf5',
  color: 'white',
  textAlign: 'left'
};

const headerCell = {
  padding: '12px 16px',
  fontWeight: '600'
};

const cell = {
  padding: '12px 16px',
  borderBottom: '1px solid #ddd'
};

const rowEven = { backgroundColor: '#f9f9f9' };
const rowOdd = { backgroundColor: '#ffffff' };

const actionBtn = {
  marginRight: '8px',
  padding: '6px 12px',
  fontSize: '12px',
  backgroundColor: '#2f4cf5',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default AdminList;
