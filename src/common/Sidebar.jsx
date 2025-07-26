// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [adminRole, setAdminRole] = useState(null);

//   // useEffect(() => {
//   //   if (admin_email && admin_password) {
//   //     fetch('http://localhost:5000/api/auth/me', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ admin_email, admin_password })
//   //     })
//   //       .then((res) => res.json())
//   //       .then((data) => setAdminRole(data.admin_role?.toLowerCase()))
//   //       .catch(() => setAdminRole(null));
//   //   }
//   // }, [admin_email, admin_password]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/auth/getCurrentAdmin', {
//       method: 'GET',
//       credentials: 'include', // ✅ include session cookie
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Unauthorized');
//         return res.json();
//       })
//       .then((data) => {
//         console.log('✅ Session User Data:', data);

//         const role = data.admin_role || data.role;
//         const normalizedRole = role?.toLowerCase();

//         if (!normalizedRole) {
//           throw new Error('Invalid role');
//         }

//         setAdminRole(normalizedRole);
//       })
//       .catch((err) => {
//         console.error('❌ Error verifying session:', err);
//         setAdminRole(null);
//         navigate('/unauthorized');
//       });
//   }, [navigate]);




//   const linkStyle = {
//     padding: '12px 16px',
//     cursor: 'pointer',
//     borderRadius: '8px',
//     margin: '6px 0',
//     fontSize: '15px',
//     color: '#222',
//     fontWeight: 500,
//     transition: 'background 0.2s ease',
//   };

//   const hoverStyle = {
//     backgroundColor: '#ddd',
//   };

//   const navItems = [
//     { name: 'Admin Users & Roles', path: '/admin-users' },
//     { name: 'Manage Charity Organization', path: '/charity' },
//     { name: 'View Donations History', path: '/donations' },
//     { name: 'Tax Deduction', path: '/tax-deduction' },
//   ];

//   if (adminRole === 'superadmin') {
//     navItems.push({ name: 'Approve Admins', path: '/admin/approve' });
//   }

//   const handleNavigate = (path) => {
//     navigate(path, {
//       state: {
//         admin_email,
//         admin_password
//       }
//     });
//   };

//   const handleProfileClick = (item) => {
//     switch (item) {
//       case 'Facebook':
//         window.open('https://www.facebook.com', '_blank');
//         break;
//       case 'Twitter':
//         window.open('https://www.twitter.com', '_blank');
//         break;
//       case 'Log Out':
//         navigate('/login');
//         break;
//       default:
//         break;
//     }
//   };

//   const profileItems = ['YumTap', 'Facebook', 'Twitter', 'Setting', 'Log Out'];

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         width: '240px',
//         backgroundColor: '#f4f4f4',
//         padding: '1.5rem 1rem',
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100vh',
//         borderRight: '1px solid #ddd',
//         fontFamily: 'Arial, sans-serif',
//       }}
//     >
//       <div>
//         <img
//           src="/yumtap.png"
//           alt="logo"
//           style={{
//             width: '70px',
//             borderRadius: '50%',
//             marginBottom: '2rem',
//             cursor: 'pointer',
//           }}
//           onClick={() => handleNavigate('/dashboard')}
//         />

//         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//           {navItems.map((item, idx) => (
//             <li
//               key={idx}
//               style={linkStyle}
//               onClick={() => handleNavigate(item.path)}
//               onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
//               onMouseOut={(e) =>
//                 Object.assign(e.target.style, { backgroundColor: 'transparent' })
//               }
//             >
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div style={{ marginTop: '2rem' }}>
//         <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1.5rem 0' }} />
//         <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
//           Profile
//         </div>
//         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//           {profileItems.map((item, idx) => (
//             <li
//               key={idx}
//               style={{ ...linkStyle, padding: '8px 14px', margin: '3px 0', fontSize: '14px' }}
//               onClick={() => handleProfileClick(item)}
//               onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
//               onMouseOut={(e) =>
//                 Object.assign(e.target.style, { backgroundColor: 'transparent' })
//               }
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [adminRole, setAdminRole] = useState(null);

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
        console.log('✅ Session User Data:', data);
        const role = data.admin_role || data.role;
        const normalizedRole = role?.toLowerCase();
        if (!normalizedRole) throw new Error('Invalid role');
        setAdminRole(normalizedRole);
      })
      .catch((err) => {
        console.error('❌ Error verifying session:', err);
        setAdminRole(null);
        navigate('/unauthorized');
      });
  }, [navigate]);

  const linkStyle = {
    padding: '12px 16px',
    cursor: 'pointer',
    borderRadius: '8px',
    margin: '6px 0',
    fontSize: '15px',
    color: '#222',
    fontWeight: 500,
    transition: 'background 0.2s ease',
  };

  const hoverStyle = {
    backgroundColor: '#ddd',
  };

  const navItems = [
    { name: 'Admin Users & Roles', path: '/admin-users' },
    { name: 'Manage Charity Organization', path: '/charity' },
    { name: 'View Donations History', path: '/donations' },
    { name: 'Tax Deduction', path: '/tax-deduction' },
  ];

  if (adminRole === 'superadmin') {
    navItems.push({ name: 'Approve Admins', path: '/admin/approve' });
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleProfileClick = (item) => {
    switch (item) {
      case 'Facebook':
        window.open('https://www.facebook.com', '_blank');
        break;
      case 'Twitter':
        window.open('https://www.twitter.com', '_blank');
        break;
      case 'Log Out':
        fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        })
          .then(() => navigate('/login'))
          .catch((err) => {
            console.error('Logout failed:', err);
            navigate('/login');
          });
        break;
      default:
        break;
    }
  };

  const profileItems = ['YumTap', 'Facebook', 'Twitter', 'Setting', 'Log Out'];

  return (
    <div
      style={{
        position: 'fixed',
        width: '240px',
        backgroundColor: '#f4f4f4',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        borderRight: '1px solid #ddd',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div>
        <img
          src="/yumtap.png"
          alt="logo"
          style={{
            width: '70px',
            borderRadius: '50%',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => handleNavigate('/dashboard')}
        />

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item, idx) => (
            <li
              key={idx}
              style={linkStyle}
              onClick={() => handleNavigate(item.path)}
              onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseOut={(e) =>
                Object.assign(e.target.style, { backgroundColor: 'transparent' })
              }
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1.5rem 0' }} />
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
          Profile
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {profileItems.map((item, idx) => (
            <li
              key={idx}
              style={{ ...linkStyle, padding: '8px 14px', margin: '3px 0', fontSize: '14px' }}
              onClick={() => handleProfileClick(item)}
              onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
              onMouseOut={(e) =>
                Object.assign(e.target.style, { backgroundColor: 'transparent' })
              }
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
