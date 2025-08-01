// // // import React, { useState } from 'react';
// // // import UserTable from '../components/AdminTable';
// // // import Sidebar from '../../common/Sidebar';
// // // import AddAdminModal from '../components/AddAdminModal';

// // // const AdminUsersPage = () => {
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     admin_name: '',
// // //     admin_email: '',
// // //     admin_phone: '',
// // //     admin_password: '',
// // //     admin_role: ''
// // //   });

// // //   const handleInputChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleAddAdmin = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:5000/api/admin', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify(formData)
// // //       });

// // //       if (response.ok) {
// // //         alert('Admin added successfully');
// // //         setShowModal(false);
// // //         window.location.reload();
// // //       } else {
// // //         alert('Failed to add admin');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <Sidebar />
// // //       <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
// // //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //           <h2>User List</h2>
// // //           <button
// // //             onClick={() => setShowModal(true)}
// // //             style={{
// // //               backgroundColor: 'green',
// // //               color: 'white',
// // //               padding: '0.5rem 1rem',
// // //               border: 'none',
// // //               borderRadius: '4px'
// // //             }}
// // //           >
// // //             + Add New User
// // //           </button>
// // //         </div>

// // //         <input
// // //           type="text"
// // //           placeholder="Search"
// // //           style={{
// // //             margin: '1rem 0',
// // //             padding: '0.5rem',
// // //             width: '250px',
// // //             borderRadius: '4px',
// // //             border: '1px solid #ccc'
// // //           }}
// // //         />

// // //         <UserTable />
// // //       </div>

// // //       {showModal && (
// // //         <AddAdminModal
// // //           formData={formData}
// // //           onChange={handleInputChange}
// // //           onSubmit={handleAddAdmin}
// // //           onClose={() => setShowModal(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AdminUsersPage;


// // import React, { useState } from 'react';
// // import UserTable from '../components/AdminTable';
// // import Sidebar from '../../common/Sidebar';
// // import AddAdminModal from '../components/AddAdminModal';

// // const AdminUsersPage = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [formData, setFormData] = useState({
// //     admin_name: '',
// //     admin_email: '',
// //     admin_phone: '',
// //     admin_password: '',
// //     admin_role: ''
// //   });

// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleAddAdmin = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin added successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to add admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleUpdateAdmin = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/admin/${editingId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin updated successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to update admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleEdit = (admin) => {
// //     setIsEditMode(true);
// //     setEditingId(admin.admin_user_id);
// //     setFormData({
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_password: '',
// //       admin_role: admin.admin_role
// //     });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setIsEditMode(false);
// //     setFormData({
// //       admin_name: '',
// //       admin_email: '',
// //       admin_phone: '',
// //       admin_password: '',
// //       admin_role: ''
// //     });
// //   };

// //   return (
// //     <div>
// //       <Sidebar />
// //       <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <h2>User List</h2>
// //           <button
// //             onClick={() => setShowModal(true)}
// //             style={{
// //               backgroundColor: 'green',
// //               color: 'white',
// //               padding: '0.5rem 1rem',
// //               border: 'none',
// //               borderRadius: '4px'
// //             }}
// //           >
// //             + Add New User
// //           </button>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Search"
// //           style={{
// //             margin: '1rem 0',
// //             padding: '0.5rem',
// //             width: '250px',
// //             borderRadius: '4px',
// //             border: '1px solid #ccc'
// //           }}
// //         />

// //         <UserTable onEdit={handleEdit} />
// //       </div>

// //       {showModal && (
// //         <AddAdminModal
// //           formData={formData}
// //           onChange={handleInputChange}
// //           onSubmit={isEditMode ? handleUpdateAdmin : handleAddAdmin}
// //           onClose={closeModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminUsersPage;

// // import React, { useState } from 'react';
// // import UserTable from '../components/AdminTable';
// // import Sidebar from '../../common/Sidebar';
// // import AddAdminModal from '../components/AddAdminModal';

// // const AdminUsersPage = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [editingId, setEditingId] = useState(null);

// //   const [formData, setFormData] = useState({
// //     admin_name: 'admin.admin_name',
// //     admin_email: 'admin.admin_email',
// //     admin_phone: 'admin.admin_phone',
// //     admin_password: 'admin.admin_password',
// //     admin_role: 'admin.admin_role',
// //     is_approved: false // ✅ NEW FIELD for approval flag
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value
// //     });
// //   };

// //   const handleAddAdmin = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin added successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to add admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleUpdateAdmin = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/admin/${editingId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin updated successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to update admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleEdit = (admin) => {
// //     setIsEditMode(true);
// //     setEditingId(admin.admin_user_id);
// //     setFormData({
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_password: '',
// //       admin_role: admin.admin_role,
// //       is_approved: admin.is_approved // ✅ Carry over approval status when editing
// //     });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setIsEditMode(false);
// //     setFormData({
// //       admin_name: '',
// //       admin_email: '',
// //       admin_phone: '',
// //       admin_password: '',
// //       admin_role: '',
// //       is_approved: false // ✅ Reset field on modal close
// //     });
// //   };

// //   return (
// //     <div>
// //       <Sidebar />
// //       <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <h2>User List</h2>
// //           <button
// //             onClick={() => setShowModal(true)}
// //             style={{
// //               backgroundColor: 'green',
// //               color: 'white',
// //               padding: '0.5rem 1rem',
// //               border: 'none',
// //               borderRadius: '4px'
// //             }}
// //           >
// //             + Add New User
// //           </button>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Search"
// //           style={{
// //             margin: '1rem 0',
// //             padding: '0.5rem',
// //             width: '250px',
// //             borderRadius: '4px',
// //             border: '1px solid #ccc'
// //           }}
// //         />

// //         <UserTable onEdit={handleEdit} />
// //       </div>

// //       {showModal && (
// //         <AddAdminModal
// //           formData={formData}
// //           onChange={handleInputChange}
// //           onSubmit={isEditMode ? handleUpdateAdmin : handleAddAdmin}
// //           onClose={closeModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminUsersPage;

// // import React, { useEffect, useState } from 'react';
// // import UserTable from '../components/AdminTable';
// // import Sidebar from '../../common/Sidebar';
// // import AddAdminModal from '../components/AddAdminModal';

// // const AdminUsersPage = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [isEditMode, setIsEditMode] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [adminData, setAdminData] = useState(null);

// //   const [formData, setFormData] = useState({
// //     admin_name: '',
// //     admin_email: '',
// //     admin_phone: '',
// //     admin_password: '',
// //     admin_role: '',
// //     is_approved: false
// //   });

// //   useEffect(() => {
// //     try {
// //       const stored = localStorage.getItem('admin');
// //       const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
// //       if (parsed?.admin_role === 'superadmin') {
// //         setAdminData(parsed);
// //       } else {
// //         setAdminData('unauthorized');
// //       }
// //     } catch (err) {
// //       console.error('Failed to parse admin from localStorage:', err);
// //       setAdminData('unauthorized');
// //     }
// //   }, []);

// //   if (adminData === 'unauthorized') {
// //     return (
// //       <div style={{ padding: '2rem' }}>
// //         <h2>Access Denied</h2>
// //         <p>You do not have permission to view this page.</p>
// //         <button
// //           style={{
// //             marginTop: '1rem',
// //             padding: '0.5rem 1rem',
// //             backgroundColor: '#007bff',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '4px',
// //             cursor: 'pointer'
// //           }}
// //           onClick={() => window.history.back()}
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   const handleInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'checkbox' ? checked : value
// //     });
// //   };

// //   const handleAddAdmin = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/api/admin', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin added successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to add admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleUpdateAdmin = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/admin/${editingId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(formData)
// //       });

// //       if (response.ok) {
// //         alert('Admin updated successfully');
// //         closeModal();
// //         window.location.reload();
// //       } else {
// //         alert('Failed to update admin');
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   const handleEdit = (admin) => {
// //     setIsEditMode(true);
// //     setEditingId(admin.admin_user_id);
// //     setFormData({
// //       admin_name: admin.admin_name,
// //       admin_email: admin.admin_email,
// //       admin_phone: admin.admin_phone,
// //       admin_password: '',
// //       admin_role: admin.admin_role,
// //       is_approved: admin.is_approved
// //     });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setIsEditMode(false);
// //     setFormData({
// //       admin_name: '',
// //       admin_email: '',
// //       admin_phone: '',
// //       admin_password: '',
// //       admin_role: '',
// //       is_approved: false
// //     });
// //   };

// //   return (
// //     <div>
// //       <Sidebar />
// //       <div style={{ marginLeft: '300px', padding: '1.5rem' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <h2>User List</h2>
// //           <button
// //             onClick={() => setShowModal(true)}
// //             style={{
// //               backgroundColor: 'green',
// //               color: 'white',
// //               padding: '0.5rem 1rem',
// //               border: 'none',
// //               borderRadius: '4px'
// //             }}
// //           >
// //             + Add New User
// //           </button>
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Search"
// //           style={{
// //             margin: '1rem 0',
// //             padding: '0.5rem',
// //             width: '250px',
// //             borderRadius: '4px',
// //             border: '1px solid #ccc'
// //           }}
// //         />

// //         <UserTable onEdit={handleEdit} />
// //       </div>

// //       {showModal && (
// //         <AddAdminModal
// //           formData={formData}
// //           onChange={handleInputChange}
// //           onSubmit={isEditMode ? handleUpdateAdmin : handleAddAdmin}
// //           onClose={closeModal}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminUsersPage;

// import React, { useEffect, useState } from 'react';
// import UserTable from '../components/AdminTable';
// import Sidebar from '../../common/Sidebar';
// import AddAdminModal from '../components/AddAdminModal';

// const AdminUsersPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     admin_name: '',
//     admin_email: '',
//     admin_password: '',
//     admin_role: '',
//     admin_phone: '',
//   });
//   const [adminData, setAdminData] = useState(null);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem('admin');
//       if (!stored || stored === 'undefined') {
//         setAdminData(null);
//       } else {
//         const parsed = JSON.parse(stored);
//         setAdminData(parsed?.admin || null);
//       }
//     } catch (err) {
//       console.error('Failed to parse admin data from localStorage:', err);
//       setAdminData(null);
//     }
//   }, []);

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({
//       admin_name: '',
//       admin_email: '',
//       admin_password: '',
//       admin_role: '',
//       admin_phone: '',
//     });
//   };

//   if (adminData === null) return <div>Loading...</div>;

//   if (adminData.admin_role !== 'superadmin') {
//     return (
//       <div style={{ padding: '2rem' }}>
//         <h2>Access Denied</h2>
//         <p>You do not have permission to view this page.</p>
//         <button
//           onClick={() => window.history.back()}
//           style={{
//             marginTop: '1rem',
//             padding: '0.5rem 1rem',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ marginLeft: '260px', padding: '2rem', width: '100%' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h2 style={{ margin: 0 }}>Admin Users & Roles</h2>
//           <button
//             onClick={handleOpenModal}
//             style={{
//               padding: '0.5rem 1rem',
//               backgroundColor: '#0000FF',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             + Add Admin
//           </button>
//         </div>

//         <UserTable />

//         {showModal && (
//           <AddAdminModal
//             formData={formData}
//             setFormData={setFormData}
//             onClose={handleCloseModal}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserTable from '../components/AdminTable';
// import Sidebar from '../../common/Sidebar';
// import AddAdminModal from '../components/AddAdminModal';

// const AdminUsersPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     admin_name: '',
//     admin_email: '',
//     admin_password: '',
//     admin_role: '',
//     admin_phone: '',
//   });
//   const [adminData, setAdminData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Authenticate on mount
//   useEffect(() => {
//     const { admin_email, admin_password } = location.state || {};

//     if (!admin_email || !admin_password) {
//       navigate('/login');
//       return;
//     }

//     fetch('http://localhost:5000/api/auth/me', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ admin_email, admin_password })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.admin_role !== 'SuperAdmin') {
//           navigate('/unauthorized', {
//             state: {
//               admin_email,
//               admin_password,
//               admin_role: data.admin_role
//             }
//           });
//         } else {
//           setAdminData(data);
//         }
//       })
//       .catch(err => {
//         console.error('Auth error:', err);
//         navigate('/login');
//       });
//   }, [location.state, navigate]);

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({
//       admin_name: '',
//       admin_email: '',
//       admin_password: '',
//       admin_role: '',
//       admin_phone: '',
//     });
//   };

//   if (adminData === null) return <div>Loading...</div>;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ marginLeft: '260px', padding: '2rem', width: '100%' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h2 style={{ margin: 0 }}>Admin Users & Roles</h2>
//           <button
//             onClick={handleOpenModal}
//             style={{
//               padding: '0.5rem 1rem',
//               backgroundColor: '#0000FF',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             + Add Admin
//           </button>
//         </div>

//         <UserTable />

//         {showModal && (
//           <AddAdminModal
//             formData={formData}
//             setFormData={setFormData}
//             onClose={handleCloseModal}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserTable from '../components/AdminTable';
// import Sidebar from '../../common/Sidebar';
// import AddAdminModal from '../components/AddAdminModal';

// const AdminUsersPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     admin_name: '',
//     admin_email: '',
//     admin_password: '',
//     admin_role: '',
//     admin_phone: '',
//   });
//   const [adminData, setAdminData] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Authenticate on mount
//   // useEffect(() => {
//   //   const { admin_email, admin_password } = location.state || {};

//   //   if (!admin_email || !admin_password) {
//   //     navigate('/login');
//   //     return;
//   //   }

//   //   fetch('http://localhost:5000/api/auth/me', {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ admin_email, admin_password })
//   //   })
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       console.log('Logged-in admin role:', data.admin_role); // ✅ Debug check

//   //       // ✅ Case-insensitive + null-safe check
//   //       if (!data.admin_role || data.admin_role.toLowerCase() !== 'superadmin') {
//   //         navigate('/unauthorized', {
//   //           state: {
//   //             admin_email,
//   //             admin_password,
//   //             admin_role: data.admin_role
//   //           }
//   //         });
//   //       } else {
//   //         setAdminData(data);
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.error('Auth error:', err);
//   //       navigate('/login');
//   //     });
//   // }, [location.state, navigate]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
//       method: 'GET',
//       credentials: 'include', // ✅ Send session cookie
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Unauthorized');
//         return res.json();
//       })
//       .then((data) => {
//         console.log('Logged-in admin role:', data.admin_role); // ✅ Debug check
//         const role = (data.admin_role || data.role || '').toLowerCase();

//         if (role !== 'superadmin') {
//           navigate('/unauthorized');
//         } else {
//           setAdminData(data);
//         }
//       })
//       .catch((err) => {
//         console.error('Auth error:', err);
//         navigate('/login');
//       });
//   }, [navigate]);


//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setFormData({
//       admin_name: '',
//       admin_email: '',
//       admin_password: '',
//       admin_role: '',
//       admin_phone: '',
//     });
//   };

//   if (adminData === null) return <div>Loading...</div>;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ marginLeft: '260px', padding: '2rem', width: '100%' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h2 style={{ margin: 0 }}>Admin Users & Roles</h2>
//           <button
//             onClick={handleOpenModal}
//             style={{
//               padding: '0.5rem 1rem',
//               backgroundColor: '#0000FF',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             + Add Admin
//           </button>
//         </div>

//         <UserTable />

//         {showModal && (
//           <AddAdminModal
//             formData={formData}
//             setFormData={setFormData}
//             onClose={handleCloseModal}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/AdminTable';
import Sidebar from '../../common/Sidebar';
import AddAdminModal from '../components/AddAdminModal';
 
const AdminUsersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_email: '',
    admin_password: '',
    admin_role: '',
    admin_phone: '',
    is_approved: false
  });
  const [adminData, setAdminData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        const role = (data.admin_role || data.role || '').toLowerCase();
        if (role !== 'superadmin') {
          navigate('/unauthorized');
        } else {
          setAdminData(data);
        }
      })
      .catch((err) => {
        console.error('Auth error:', err);
        navigate('/login');
      });
  }, [navigate]);
 
  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setShowModal(true);
    setFormData({
      admin_name: '',
      admin_email: '',
      admin_password: '',
      admin_role: '',
      admin_phone: '',
      is_approved: false
    });
  };
 
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      admin_name: '',
      admin_email: '',
      admin_password: '',
      admin_role: '',
      admin_phone: '',
      is_approved: false
    });
  };
 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
        handleCloseModal();
        window.location.reload();
      } else {
        alert('Failed to add admin');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };
 
  const handleUpdateAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
 
      if (response.ok) {
        alert('Admin updated successfully');
        handleCloseModal();
        window.location.reload();
      } else {
        alert('Failed to update admin');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    }
  };
 
  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdateAdmin();
    } else {
      handleAddAdmin();
    }
  };
 
  const handleEdit = (admin) => {
    setIsEditMode(true);
    setEditingId(admin.admin_user_id);
    setShowModal(true);
    setFormData({
      admin_name: admin.admin_name,
      admin_email: admin.admin_email,
      admin_password: '',
      admin_role: admin.admin_role,
      admin_phone: admin.admin_phone,
      is_approved: admin.is_approved
    });
  };
 
  if (adminData === null) return <div>Loading...</div>;
 
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '2rem', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Admin Users & Roles</h2>
          <button
            onClick={handleOpenModal}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0000FF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Add Admin
          </button>
        </div>
 
        <UserTable onEdit={handleEdit} />
 
        {showModal && (
          <AddAdminModal
            formData={formData}
            setFormData={setFormData}
            onChange={handleInputChange}
            onSubmit={handleSubmit} // ✅ now supports both add and edit
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};
 
export default AdminUsersPage;