// import React from 'react';

// const CharityTable = ({ charities, onEdit, onDelete }) => {
//   if (!Array.isArray(charities) || charities.length === 0) {
//     return <p style={{ padding: '1rem', color: '#888' }}>No charity data available.</p>;
//   }

//   return (
//     <div style={tableWrapper}>
//       <div style={tableHeader}>
//         <div style={{ ...colStyle, flex: 1 }}>Charity Icon</div>
//         <div style={{ ...colStyle, flex: 2 }}>Charity Name</div>
//         <div style={{ ...colStyle, flex: 3 }}>Description</div>
//         <div style={{ ...colStyle, flex: 2 }}>UEN</div>
//         <div style={{ ...colStyle, flex: 2 }}>Actions</div>
//       </div>

//       {charities.map((charity, idx) => (
//         <div key={idx} style={tableRow}>
//           <div style={{ ...colStyle, flex: 1 }}>
//             {charity.charity_image ? (
//               <img
//                 src={`http://localhost:5000/uploads/${charity.charity_image}`}
//                 alt={charity.charity_name}
//                 style={imgStyle}
//                 onError={(e) => (e.target.src = '/placeholder.png')}
//               />
//             ) : (
//               <span style={{ color: '#aaa' }}>No Image</span>
//             )}
//           </div>
//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_name}</div>
//           <div style={{ ...colStyle, flex: 3 }}>{charity.charity_description}</div>
//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_UEN}</div>
//           <div style={{ ...colStyle, flex: 2 }}>
//             <button style={editBtn} onClick={() => onEdit(charity)}>✏️ Edit</button>
//             <button style={deleteBtn} onClick={() => onDelete(charity.charity_id)}>🗑️ Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// // 🔧 Styles
// const tableWrapper = {
//   display: 'flex',
//   flexDirection: 'column',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//   overflow: 'hidden',
//   backgroundColor: '#fff',
// };

// const tableHeader = {
//   display: 'flex',
//   backgroundColor: '#444',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '12px',
// };

// const tableRow = {
//   display: 'flex',
//   borderBottom: '1px solid #eee',
//   padding: '12px',
//   alignItems: 'center',
// };

// const colStyle = {
//   padding: '0 10px',
//   display: 'flex',
//   alignItems: 'center',
// };

// const imgStyle = {
//   width: '100px',
//   height: '100px',
//   borderRadius: '6px',
//   objectFit: 'contain',
// };

// const editBtn = {
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   marginRight: '6px',
//   cursor: 'pointer',
// };

// const deleteBtn = {
//   backgroundColor: '#f44336',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default CharityTable;



// import React from 'react';

// const CharityTable = ({ charities, onEdit, onDelete }) => {
//   if (!Array.isArray(charities) || charities.length === 0) {
//     return <p style={{ padding: '1rem', color: '#888' }}>No charity data available.</p>;
//   }

//   const isFeatured = (value) => value === 1 || value === '1' || value === true;

//   const handleToggleFeatured = async (charity) => {
//     const updatedCharity = {
//       ...charity,
//       is_charity_featured: isFeatured(charity.is_charity_featured) ? 0 : 1,
//     };

//     try {
//       const formData = new FormData();
//       formData.append('charity_name', updatedCharity.charity_name);
//       formData.append('charity_description', updatedCharity.charity_description);
//       formData.append('charity_UEN', updatedCharity.charity_UEN);
//       formData.append('is_charity_featured', updatedCharity.is_charity_featured);

//       await fetch(`http://localhost:5000/api/charities/${updatedCharity.charity_id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       onEdit(); // Refresh charity list or data
//     } catch (err) {
//       console.error('❌ Failed to toggle featured status:', err);
//       alert('Failed to update featured status.');
//     }
//   };

//   return (
//     <div style={tableWrapper}>
//       <div style={tableHeader}>
//         <div style={{ ...colStyle, flex: 1 }}>Charity Icon</div>
//         <div style={{ ...colStyle, flex: 2 }}>Charity Name</div>
//         <div style={{ ...colStyle, flex: 3 }}>Description</div>
//         <div style={{ ...colStyle, flex: 2 }}>UEN</div>
//         <div style={{ ...colStyle, flex: 1 }}>Featured</div>
//         <div style={{ ...colStyle, flex: 2 }}>Actions</div>
//       </div>

//       {charities.map((charity, idx) => (
//         <div key={idx} style={tableRow}>
//           <div style={{ ...colStyle, flex: 1 }}>
//             {charity.charity_image ? (
//               <img
//                 src={`http://localhost:5000/uploads/${charity.charity_image}`}
//                 alt={charity.charity_name}
//                 style={imgStyle}
//                 onError={(e) => (e.target.src = '/placeholder.png')}
//               />
//             ) : (
//               <span style={{ color: '#aaa' }}>No Image</span>
//             )}
//           </div>

//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_name}</div>
//           <div style={{ ...colStyle, flex: 3 }}>{charity.charity_description}</div>
//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_UEN}</div>

//           <div style={{ ...colStyle, flex: 1 }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isFeatured(charity.is_charity_featured)}
//                 onChange={() => handleToggleFeatured(charity)}
//               />
//               <span style={{ marginLeft: '8px' }}>
//                 {isFeatured(charity.is_charity_featured) ? 'Yes' : 'No'}
//               </span>
//             </label>
//           </div>

//           <div style={{ ...colStyle, flex: 2 }}>
//             <button style={editBtn} onClick={() => onEdit(charity)}>✏️ Edit</button>
//             <button style={deleteBtn} onClick={() => onDelete(charity.charity_id)}>🗑️ Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // 🔧 Styles
// const tableWrapper = {
//   display: 'flex',
//   flexDirection: 'column',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//   overflow: 'hidden',
//   backgroundColor: '#fff',
// };

// const tableHeader = {
//   display: 'flex',
//   backgroundColor: '#444',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '12px',
// };

// const tableRow = {
//   display: 'flex',
//   borderBottom: '1px solid #eee',
//   padding: '12px',
//   alignItems: 'center',
// };

// const colStyle = {
//   padding: '0 10px',
//   display: 'flex',
//   alignItems: 'center',
// };

// const imgStyle = {
//   width: '100px',
//   height: '100px',
//   borderRadius: '6px',
//   objectFit: 'contain',
// };

// const editBtn = {
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   marginRight: '6px',
//   cursor: 'pointer',
// };

// const deleteBtn = {
//   backgroundColor: '#f44336',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default CharityTable;


// import React, { useState } from 'react';
// import { toast } from 'react-toastify';


// const CharityTable = ({ charities, onEdit, onDelete }) => {
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);

//   if (!Array.isArray(charities) || charities.length === 0) {
//     return <p style={{ padding: '1rem', color: '#888' }}>No charity data available.</p>;
//   }

//   const isFeatured = (value) => value === 1 || value === '1' || value === true;

//   const handleToggleFeatured = async (charity) => {
//     const updatedCharity = {
//       ...charity,
//       is_charity_featured: isFeatured(charity.is_charity_featured) ? 0 : 1,
//     };

//     try {
//       const formData = new FormData();
//       formData.append('charity_name', updatedCharity.charity_name);
//       formData.append('charity_description', updatedCharity.charity_description);
//       formData.append('charity_UEN', updatedCharity.charity_UEN);
//       formData.append('is_charity_featured', updatedCharity.is_charity_featured);

//       await fetch(`http://localhost:5000/api/charities/${updatedCharity.charity_id}`, {
//         method: 'PUT',
//         body: formData,
//       });

//       onEdit(); // Refresh charity list or data
//     } catch (err) {
//       console.error('❌ Failed to toggle featured status:', err);
//       alert('Failed to update featured status.');
//     }
//   };

//   return (
//     <div style={tableWrapper}>
//       <div style={tableHeader}>
//         <div style={{ ...colStyle, flex: 1 }}>Charity Icon</div>
//         <div style={{ ...colStyle, flex: 2 }}>Charity Name</div>
//         <div style={{ ...colStyle, flex: 3 }}>Description</div>
//         <div style={{ ...colStyle, flex: 2 }}>UEN</div>
//         <div style={{ ...colStyle, flex: 1 }}>Featured</div>
//         <div style={{ ...colStyle, flex: 2 }}>Actions</div>
//       </div>

//       {charities.map((charity, idx) => (
//         <div key={idx} style={tableRow}>
//           <div style={{ ...colStyle, flex: 1 }}>
//             {charity.charity_image ? (
//               <img
//                 src={`http://localhost:5000/uploads/${charity.charity_image}`}
//                 alt={charity.charity_name}
//                 style={imgStyle}
//                 onError={(e) => (e.target.src = '/placeholder.png')}
//               />
//             ) : (
//               <span style={{ color: '#aaa' }}>No Image</span>
//             )}
//           </div>

//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_name}</div>
//           <div style={{ ...colStyle, flex: 3 }}>{charity.charity_description}</div>
//           <div style={{ ...colStyle, flex: 2 }}>{charity.charity_UEN}</div>

//           <div style={{ ...colStyle, flex: 1 }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isFeatured(charity.is_charity_featured)}
//                 onChange={() => handleToggleFeatured(charity)}
//               />
//               <span style={{ marginLeft: '8px' }}>
//                 {isFeatured(charity.is_charity_featured) ? 'Yes' : 'No'}
//               </span>
//             </label>
//           </div>

//           <div style={{ ...colStyle, flex: 2 }}>
//             <button style={editBtn} onClick={() => onEdit(charity)}>✏️ Edit</button>
//             {/* {confirmDeleteId === charity.charity_id ? (
//               <>
//                 <button
//                   style={confirmBtn}
//                   onClick={() => {
//                     onDelete(charity.charity_id);
//                     setConfirmDeleteId(null);
//                   }}
//                 >
//                   ✅ Confirm
//                 </button>
//                 <button style={cancelBtn} onClick={() => setConfirmDeleteId(null)}>❌ Cancel</button>
//               </>
//             ) : (
//               <button style={deleteBtn} onClick={() => setConfirmDeleteId(charity.charity_id)}>🗑️ Delete</button>
//             )} */}
//             {confirmDeleteId === charity.charity_id ? (
//               <>
//                 <button
//                   style={confirmBtn}
//                   onClick={() => {
//                     onDelete(charity.charity_id); // This will still call your parent delete handler
//                     toast.success('✅ Charity deleted successfully!');
//                     setConfirmDeleteId(null);
//                   }}
//                 >
//                   ✅ Confirm
//                 </button>
//                 <button style={cancelBtn} onClick={() => setConfirmDeleteId(null)}>❌ Cancel</button>
//               </>
//             ) : (
//               <button
//                 style={deleteBtn}
//                 onClick={() => setConfirmDeleteId(charity.charity_id)}
//               >
//                 🗑️ Delete
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // 🔧 Styles
// const tableWrapper = {
//   display: 'flex',
//   flexDirection: 'column',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//   overflow: 'hidden',
//   backgroundColor: '#fff',
// };

// const tableHeader = {
//   display: 'flex',
//   backgroundColor: '#444',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '12px',
// };

// const tableRow = {
//   display: 'flex',
//   borderBottom: '1px solid #eee',
//   padding: '12px',
//   alignItems: 'center',
// };

// const colStyle = {
//   padding: '0 10px',
//   display: 'flex',
//   alignItems: 'center',
// };

// const imgStyle = {
//   width: '100px',
//   height: '100px',
//   borderRadius: '6px',
//   objectFit: 'contain',
// };

// const editBtn = {
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   marginRight: '6px',
//   cursor: 'pointer',
// };

// const deleteBtn = {
//   backgroundColor: '#f44336',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// const confirmBtn = {
//   backgroundColor: '#ffa500',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   marginLeft: '6px',
//   marginRight: '6px',
//   cursor: 'pointer',
// };

// const cancelBtn = {
//   backgroundColor: '#888',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default CharityTable;



import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CharityTable = ({ charities, onEdit, onDelete }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (!Array.isArray(charities) || charities.length === 0) {
    return <p style={{ padding: '1rem', color: '#888' }}>No charity data available.</p>;
  }

  const isFeatured = (value) => value === 1 || value === '1' || value === true;

  const handleToggleFeatured = async (charity) => {
    const updatedCharity = {
      ...charity,
      is_charity_featured: isFeatured(charity.is_charity_featured) ? 0 : 1,
    };

    try {
      const formData = new FormData();
      formData.append('charity_name', updatedCharity.charity_name);
      formData.append('charity_description', updatedCharity.charity_description);
      formData.append('charity_UEN', updatedCharity.charity_UEN);
      formData.append('is_charity_featured', updatedCharity.is_charity_featured);

      await fetch(`http://localhost:5000/api/charities/${updatedCharity.charity_id}`, {
        method: 'PUT',
        body: formData,
      });

      onEdit(); // Refresh charity list or data
    } catch (err) {
      console.error('❌ Failed to toggle featured status:', err);
      toast.error('❌ Failed to update featured status.');
    }
  };

  return (
    <div style={tableWrapper}>
      <div style={tableHeader}>
        <div style={{ ...colStyle, flex: 1 }}>Charity Icon</div>
        <div style={{ ...colStyle, flex: 2 }}>Charity Name</div>
        <div style={{ ...colStyle, flex: 3 }}>Description</div>
        <div style={{ ...colStyle, flex: 2 }}>UEN</div>
        <div style={{ ...colStyle, flex: 1 }}>Featured</div>
        <div style={{ ...colStyle, flex: 2 }}>Actions</div>
      </div>

      {charities.map((charity, idx) => (
        <div key={idx} style={tableRow}>
          <div style={{ ...colStyle, flex: 1 }}>
            {charity.charity_image ? (
              <img
                src={`http://localhost:5000/uploads/${charity.charity_image}`}
                alt={charity.charity_name}
                style={imgStyle}
                onError={(e) => (e.target.src = '/placeholder.png')}
              />
            ) : (
              <span style={{ color: '#aaa' }}>No Image</span>
            )}
          </div>

          <div style={{ ...colStyle, flex: 2 }}>{charity.charity_name}</div>
          <div style={{ ...colStyle, flex: 3 }}>{charity.charity_description}</div>
          <div style={{ ...colStyle, flex: 2 }}>{charity.charity_UEN}</div>

          <div style={{ ...colStyle, flex: 1 }}>
            <label>
              <input
                type="checkbox"
                checked={isFeatured(charity.is_charity_featured)}
                onChange={() => handleToggleFeatured(charity)}
              />
              <span style={{ marginLeft: '8px' }}>
                {isFeatured(charity.is_charity_featured) ? 'Yes' : 'No'}
              </span>
            </label>
          </div>

          <div style={{ ...colStyle, flex: 2 }}>
            <button style={editBtn} onClick={() => onEdit(charity)}>✏️ Edit</button>
            {confirmDeleteId === charity.charity_id ? (
              <>
                <button
                  style={confirmBtn}
                  onClick={() => {
                    onDelete(charity.charity_id);
                    toast.success('✅ Charity deleted successfully!');
                    setConfirmDeleteId(null);
                  }}
                >
                  ✅ Confirm
                </button>
                <button style={cancelBtn} onClick={() => setConfirmDeleteId(null)}>❌ Cancel</button>
              </>
            ) : (
              <button
                style={deleteBtn}
                onClick={() => setConfirmDeleteId(charity.charity_id)}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// 🔧 Styles
const tableWrapper = {
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

const tableHeader = {
  display: 'flex',
  backgroundColor: '#444',
  color: 'white',
  fontWeight: 'bold',
  padding: '12px',
};

const tableRow = {
  display: 'flex',
  borderBottom: '1px solid #eee',
  padding: '12px',
  alignItems: 'center',
};

const colStyle = {
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '6px',
  objectFit: 'contain',
};

const editBtn = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  marginRight: '6px',
  cursor: 'pointer',
};

const deleteBtn = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const confirmBtn = {
  backgroundColor: '#ffa500',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  marginLeft: '6px',
  marginRight: '6px',
  cursor: 'pointer',
};

const cancelBtn = {
  backgroundColor: '#888',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default CharityTable;
