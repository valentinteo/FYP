// import React from 'react';
// import UserTable from '../components/UserTable';
// import Sidebar from '../../common/Sidebar';


// const AdminUsersPage = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1, padding: '1rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h2>User List</h2>
//           <button style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem 1rem' }}>+ Add New User</button>
//         </div>
//         <input type="text" placeholder="Search" style={{ margin: '1rem 0', padding: '0.5rem' }} />
//         <UserTable />
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;



import React from 'react';
import UserTable from '../components/AdminTable';
import Sidebar from '../../common/Sidebar';

const AdminUsersPage = () => {
  return (
    <div>
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Main content pushed right by sidebar width */}
      <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>User List</h2>
          <button style={{ backgroundColor: 'green', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
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
    </div>
  );
};

export default AdminUsersPage;
