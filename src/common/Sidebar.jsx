// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Sidebar = () => {
// //   const navigate = useNavigate();

// //   const linkStyle = {
// //     padding: '12px 16px',
// //     cursor: 'pointer',
// //     borderRadius: '8px',
// //     margin: '6px 0',
// //     fontSize: '15px',
// //     color: '#222',
// //     fontWeight: 500,
// //     transition: 'background 0.2s ease',
// //   };

// //   const hoverStyle = {
// //     backgroundColor: '#ddd',
// //   };

// //   const navItems = [
// //     { name: 'Admin Users & Roles', path: '/admin-users' },
// //     { name: 'Manage Charity Organization', path: '/charity' },
// //     { name: 'View Donations History', path: '/donations' },
// //     { name: 'Tax Deduction', path: '/tax-deduction' },
// //   ];

// //   const handleProfileClick = (item) => {
// //     switch (item) {
// //       case 'Facebook':
// //         window.open('https://www.facebook.com', '_blank');
// //         break;
// //       case 'Twitter':
// //         window.open('https://www.twitter.com', '_blank');
// //         break;
// //       case 'Log Out':
// //         navigate('/login');
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const profileItems = ['YumTap', 'Facebook', 'Twitter', 'Setting', 'Log Out'];

// //   return (
// //     <div
// //       style={{
// //         position: 'fixed',
// //         width: '240px',
// //         backgroundColor: '#f4f4f4',
// //         padding: '1.5rem 1rem',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         height: '100vh',
// //         borderRight: '1px solid #ddd',
// //         fontFamily: 'Arial, sans-serif',
// //       }}
// //     >
// //       <div>
// //         <img
// //           src="yumtap.png"
// //           alt="logo"
// //           style={{
// //             width: '70px',
// //             borderRadius: '50%',
// //             marginBottom: '2rem',
// //             cursor: 'pointer',
// //           }}
// //           onClick={() => navigate('/dashboard')}
// //         />

// //         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //           {navItems.map((item, idx) => (
// //             <li
// //               key={idx}
// //               style={linkStyle}
// //               onClick={() => navigate(item.path)}
// //               onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
// //               onMouseOut={(e) =>
// //                 Object.assign(e.target.style, { backgroundColor: 'transparent' })
// //               }
// //             >
// //               {item.name}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       <div style={{ marginTop: '2rem' }}>
// //         <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1.5rem 0' }} />
// //         <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
// //           Profile
// //         </div>
// //         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
// //           {profileItems.map((item, idx) => (
// //             <li
// //               key={idx}
// //               style={{ ...linkStyle, padding: '8px 14px', margin: '3px 0', fontSize: '14px' }}
// //               onClick={() => handleProfileClick(item)}
// //               onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
// //               onMouseOut={(e) =>
// //                 Object.assign(e.target.style, { backgroundColor: 'transparent' })
// //               }
// //             >
// //               {item}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

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
//     { name: 'Approve Admins', path: '/admin/approve' }

//   ];

//   // ✅ NEW: simulate logged-in user role
//   const currentUser = JSON.parse(localStorage.getItem('admin')) || null;
//   const isSuperAdmin = currentUser?.admin_role === 'superadmin';

//   if (isSuperAdmin) {
//     navItems.push({ name: 'Approve Admins', path: '/admin/approve' });
//   }

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
//           src="yumtap.png"
//           alt="logo"
//           style={{
//             width: '70px',
//             borderRadius: '50%',
//             marginBottom: '2rem',
//             cursor: 'pointer',
//           }}
//           onClick={() => navigate('/dashboard')}
//         />

//         <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//           {navItems.map((item, idx) => (
//             <li
//               key={idx}
//               style={linkStyle}
//               onClick={() => navigate(item.path)}
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

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

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

  const handleProfileClick = (item) => {
    switch (item) {
      case 'Facebook':
        window.open('https://www.facebook.com', '_blank');
        break;
      case 'Twitter':
        window.open('https://www.twitter.com', '_blank');
        break;
      case 'Log Out':
        localStorage.removeItem('admin');
        navigate('/login');
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
          src="yumtap.png"
          alt="logo"
          style={{
            width: '70px',
            borderRadius: '50%',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/dashboard')}
        />

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item, idx) => (
            <li
              key={idx}
              style={linkStyle}
              onClick={() => navigate(item.path)}
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

