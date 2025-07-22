// // import React, { useEffect, useState } from 'react';
// // import Sidebar from '../../common/Sidebar';
// // import CharityTable from '../components/CharityTable';
// // import AddCharityModal from '../components/AddCharityModal';
// // import EditCharityModal from '../components/EditCharityModal';
// // import SearchBar from '../components/Searchbar';

// // const CharityManagementPage = () => {
// //   const [charities, setCharities] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [editingCharity, setEditingCharity] = useState(null);

// //   const fetchCharities = () => {
// //     fetch('http://localhost:5000/api/charities')
// //       .then((res) => res.json())
// //       .then((data) => setCharities(data))
// //       .catch((err) => {
// //         console.error('❌ Failed to fetch charities:', err);
// //         alert('Error loading charities');
// //         setCharities([]);
// //       });
// //   };

// //   useEffect(() => {
// //     fetchCharities();
// //   }, []);

// //   const handleCharityAdded = (error = null) => {
// //     setShowAddModal(false);
// //     if (error) {
// //       alert(`❌ Failed to add charity: ${error}`);
// //     } else {
// //       fetchCharities();
// //     }
// //   };

// //   const handleEdit = (charity) => {
// //     setEditingCharity(charity);
// //   };

// //   const handleDelete = async (id) => {
// //     const confirm = window.confirm('Are you sure you want to delete this charity?');
// //     if (!confirm) return;

// //     try {
// //       const res = await fetch(`http://localhost:5000/api/charities/${id}`, {
// //         method: 'DELETE',
// //       });

// //       const result = await res.json();
// //       if (!res.ok) {
// //         alert(`❌ Failed to delete charity: ${result.details || result.error}`);
// //         return;
// //       }

// //       fetchCharities();
// //     } catch (err) {
// //       console.error('❌ Failed to delete charity:', err);
// //       alert('Network error while deleting charity');
// //     }
// //   };

// //   const handleEditSaved = () => {
// //     setEditingCharity(null);
// //     fetchCharities();
// //   };

// //   const filteredCharities = charities.filter((charity) =>
// //     charity.charity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     charity.charity_UEN.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <Sidebar />
// //       <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //           <h2>MANAGE CHARITY ORGANIZATION</h2>
// //           <button
// //             onClick={() => setShowAddModal(true)}
// //             style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
// //           >
// //             + Add New Charity
// //           </button>
// //         </div>

// //         <SearchBar value={searchTerm} onChange={setSearchTerm} />

// //         <CharityTable charities={filteredCharities} onEdit={handleEdit} onDelete={handleDelete} />

// //         {showAddModal && (
// //           <AddCharityModal
// //             onClose={() => setShowAddModal(false)}
// //             onCharityAdded={handleCharityAdded}
// //           />
// //         )}

// //         {editingCharity && (
// //           <EditCharityModal
// //             charity={editingCharity}
// //             onClose={() => setEditingCharity(null)}
// //             onUpdated={handleEditSaved}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CharityManagementPage;

// // import React, { useEffect, useState } from 'react';
// // import Sidebar from '../../common/Sidebar';
// // import CharityTable from '../components/CharityTable';
// // import AddCharityModal from '../components/AddCharityModal';
// // import EditCharityModal from '../components/EditCharityModal';
// // import SearchBar from '../components/Searchbar';

// // const CharityManagementPage = () => {
// //   const [charities, setCharities] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [editingCharity, setEditingCharity] = useState(null);
// //   const [adminData, setAdminData] = useState(null);

// //   useEffect(() => {
// //     try {
// //       const stored = localStorage.getItem('admin');
// //       const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : null;
// //       const role = parsed?.admin?.admin_role;

// //       if (role === 'superadmin' || role === 'Charity Admin') {
// //         setAdminData(parsed.admin);
// //       } else {
// //         setAdminData('unauthorized');
// //       }
// //     } catch (err) {
// //       console.error('Failed to parse admin from localStorage:', err);
// //       setAdminData('unauthorized');
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (adminData && adminData !== 'unauthorized') {
// //       fetchCharities();
// //     }
// //   }, [adminData]);

// //   const fetchCharities = () => {
// //     fetch('http://localhost:5000/api/charities')
// //       .then((res) => res.json())
// //       .then((data) => setCharities(data))
// //       .catch((err) => {
// //         console.error('❌ Failed to fetch charities:', err);
// //         alert('Error loading charities');
// //         setCharities([]);
// //       });
// //   };

// //   const handleCharityAdded = (error = null) => {
// //     setShowAddModal(false);
// //     if (error) {
// //       alert(`❌ Failed to add charity: ${error}`);
// //     } else {
// //       fetchCharities();
// //     }
// //   };

// //   const handleEdit = (charity) => {
// //     setEditingCharity(charity);
// //   };

// //   const handleDelete = async (id) => {
// //     const confirm = window.confirm('Are you sure you want to delete this charity?');
// //     if (!confirm) return;

// //     try {
// //       const res = await fetch(`http://localhost:5000/api/charities/${id}`, {
// //         method: 'DELETE',
// //       });

// //       const result = await res.json();
// //       if (!res.ok) {
// //         alert(`❌ Failed to delete charity: ${result.details || result.error}`);
// //         return;
// //       }

// //       fetchCharities();
// //     } catch (err) {
// //       console.error('❌ Failed to delete charity:', err);
// //       alert('Network error while deleting charity');
// //     }
// //   };

// //   const handleEditSaved = () => {
// //     setEditingCharity(null);
// //     fetchCharities();
// //   };

// //   const filteredCharities = charities.filter((charity) =>
// //     charity.charity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     charity.charity_UEN.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (adminData === null) return <div>Loading...</div>;

// //   if (adminData === 'unauthorized') {
// //     return (
// //       <div style={{ padding: '2rem' }}>
// //         <h2>Access Denied</h2>
// //         <p>You do not have permission to view this page.</p>
// //         <button
// //           onClick={() => window.history.back()}
// //           style={{
// //             marginTop: '1rem',
// //             padding: '0.5rem 1rem',
// //             backgroundColor: '#007bff',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '4px',
// //             cursor: 'pointer'
// //           }}
// //         >
// //           Go Back
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ display: 'flex' }}>
// //       <Sidebar />
// //       <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //           <h2>MANAGE CHARITY ORGANIZATION</h2>
// //           {adminData.admin_role === 'superadmin' && (
// //             <button
// //               onClick={() => setShowAddModal(true)}
// //               style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
// //             >
// //               + Add New Charity
// //             </button>
// //           )}
// //         </div>

// //         <SearchBar value={searchTerm} onChange={setSearchTerm} />
// //         <CharityTable charities={filteredCharities} onEdit={handleEdit} onDelete={handleDelete} />

// //         {showAddModal && (
// //           <AddCharityModal
// //             onClose={() => setShowAddModal(false)}
// //             onCharityAdded={handleCharityAdded}
// //           />
// //         )}

// //         {editingCharity && (
// //           <EditCharityModal
// //             charity={editingCharity}
// //             onClose={() => setEditingCharity(null)}
// //             onUpdated={handleEditSaved}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CharityManagementPage;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '../../common/Sidebar';
// import CharityTable from '../components/CharityTable';
// import AddCharityModal from '../components/AddCharityModal';
// import EditCharityModal from '../components/EditCharityModal';
// import SearchBar from '../components/Searchbar';

// const CharityManagementPage = () => {
//   const [charities, setCharities] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingCharity, setEditingCharity] = useState(null);
//   const [adminData, setAdminData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

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
//         const role = data.admin_role;
//         if (role !== 'SuperAdmin' && role !== 'Charity Admin') {
//           navigate('/unauthorized', {
//             state: {
//               admin_email,
//               admin_password,
//               admin_role: role
//             }
//           });
//         } else {
//           setAdminData(data);
//           fetchCharities();
//         }
//       })
//       .catch(err => {
//         console.error('Auth error:', err);
//         navigate('/login');
//       });
//   }, [location.state, navigate]);

//   const fetchCharities = () => {
//     fetch('http://localhost:5000/api/charities')
//       .then((res) => res.json())
//       .then((data) => setCharities(data))
//       .catch((err) => {
//         console.error('❌ Failed to fetch charities:', err);
//         alert('Error loading charities');
//         setCharities([]);
//       });
//   };

//   const handleCharityAdded = (error = null) => {
//     setShowAddModal(false);
//     if (error) {
//       alert(`❌ Failed to add charity: ${error}`);
//     } else {
//       fetchCharities();
//     }
//   };

//   const handleEdit = (charity) => {
//     setEditingCharity(charity);
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this charity?');
//     if (!confirm) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/charities/${id}`, {
//         method: 'DELETE',
//       });

//       const result = await res.json();
//       if (!res.ok) {
//         alert(`❌ Failed to delete charity: ${result.details || result.error}`);
//         return;
//       }

//       fetchCharities();
//     } catch (err) {
//       console.error('❌ Failed to delete charity:', err);
//       alert('Network error while deleting charity');
//     }
//   };

//   const handleEditSaved = () => {
//     setEditingCharity(null);
//     fetchCharities();
//   };

//   const filteredCharities = charities.filter((charity) =>
//     charity.charity_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     charity.charity_UEN.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (adminData === null) return <div>Loading...</div>;

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <h2>MANAGE CHARITY ORGANIZATION</h2>
//           {adminData.admin_role === 'SuperAdmin' && (
//             <button
//               onClick={() => setShowAddModal(true)}
//               style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
//             >
//               + Add New Charity
//             </button>
//           )}
//         </div>

//         <SearchBar value={searchTerm} onChange={setSearchTerm} />
//         <CharityTable charities={filteredCharities} onEdit={handleEdit} onDelete={handleDelete} />

//         {showAddModal && (
//           <AddCharityModal
//             onClose={() => setShowAddModal(false)}
//             onCharityAdded={handleCharityAdded}
//           />
//         )}

//         {editingCharity && (
//           <EditCharityModal
//             charity={editingCharity}
//             onClose={() => setEditingCharity(null)}
//             onUpdated={handleEditSaved}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CharityManagementPage;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import CharityTable from '../components/CharityTable';
import AddCharityModal from '../components/AddCharityModal';
import EditCharityModal from '../components/EditCharityModal';
import SearchBar from '../components/Searchbar';
import { toast } from 'react-toastify';

const CharityManagementPage = () => {
  const [charities, setCharities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCharity, setEditingCharity] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { admin_email, admin_password } = location.state || {};

    if (!admin_email || !admin_password) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_email, admin_password })
    })
      .then(res => res.json())
      .then(data => {
        const role = (data.admin_role || '').toLowerCase();
        if (role !== 'superadmin' && role !== 'charity admin') {
          navigate('/unauthorized', {
            state: { admin_email, admin_password, admin_role: data.admin_role }
          });
        } else {
          setAdminData(data);
          fetchCharities();
        }
      })
      .catch(err => {
        console.error('Auth error:', err);
        navigate('/login');
      });
  }, [location.state, navigate]);

  const fetchCharities = () => {
    fetch('http://localhost:5000/api/charities')
      .then((res) => res.json())
      .then((data) => setCharities(data))
      .catch((err) => {
        console.error('❌ Failed to fetch charities:', err);
        alert('Error loading charities');
        setCharities([]);
      });
  };

  const handleCharityAdded = (error = null) => {
    setShowAddModal(false);
    if (error) {
      alert(`❌ Failed to add charity: ${error}`);
    } else {
      fetchCharities();
    }
  };

  const handleEdit = (charity) => {
    setEditingCharity(charity);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/charities/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(`❌ Failed to delete charity: ${result.details || result.error}`);
        return;
      }

      fetchCharities();
    } catch (err) {
      console.error('❌ Failed to delete charity:', err);
      toast.error('Network error while deleting charity');
    }
  };


  const handleEditSaved = () => {
    setEditingCharity(null);
    fetchCharities();
  };

  const filteredCharities = charities.filter((charity) =>
    (charity.charity_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (charity.charity_UEN || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (adminData === null) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>MANAGE CHARITY ORGANIZATION</h2>
          {adminData.admin_role?.toLowerCase() === 'superadmin' && (
            <button
              onClick={() => setShowAddModal(true)}
              style={{ backgroundColor: '#0000FF', color: 'white', padding: '0.5rem 1rem' }}
            >
              + Add New Charity
            </button>
          )}
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CharityTable charities={filteredCharities} onEdit={handleEdit} onDelete={handleDelete} />

        {showAddModal && (
          <AddCharityModal
            onClose={() => setShowAddModal(false)}
            onCharityAdded={handleCharityAdded}
          />
        )}

        {editingCharity && (
          <EditCharityModal
            charity={editingCharity}
            onClose={() => setEditingCharity(null)}
            onUpdated={handleEditSaved}
          />
        )}
      </div>
    </div>
  );
};

export default CharityManagementPage;
