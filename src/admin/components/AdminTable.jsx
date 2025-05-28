import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin')
      .then(res => setAdmins(res.data))
      .catch(err => console.error('Failed to fetch admins:', err));
  }, []);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead style={{ backgroundColor: '#2f4cf5', color: 'white' }}>
        <tr>
          <th>#ID</th>
          <th>Admin Name</th>
          <th>Email</th>
          <th>Mobile No.</th>
          <th>Created Date</th>
          <th>Roles</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {admins.map(admin => (
            <tr key={admin.admin_user_id}>
              <td>{admin.admin_user_id}</td>
              <td>{admin.admin_name}</td>
              <td>{admin.admin_email}</td>
              <td>{admin.admin_phone}</td>
              <td>{admin.admin_role}</td>
              <td>{new Date(admin.admin_created_date_time).toLocaleString()}</td>
              <td>{new Date(admin.admin_last_login).toLocaleString()}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminList;
