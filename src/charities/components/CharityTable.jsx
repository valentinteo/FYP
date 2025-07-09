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



import React from 'react';

const CharityTable = ({ charities, onEdit, onDelete }) => {
  if (!Array.isArray(charities) || charities.length === 0) {
    return <p style={{ padding: '1rem', color: '#888' }}>No charity data available.</p>;
  }

  const handleToggleFeatured = (charity) => {
    const updatedCharity = {
      ...charity,
      is_charity_featured: charity.is_charity_featured === 1 ? 0 : 1,
    };
    onEdit(updatedCharity);
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

          {/* 🔁 Featured toggle */}
          <div style={{ ...colStyle, flex: 1 }}>
            <label>
              <input
                type="checkbox"
                checked={charity.is_charity_featured === 1}
                onChange={() => handleToggleFeatured(charity)}
              />
              <span style={{ marginLeft: '8px' }}>
                {charity.is_charity_featured === 1 ? 'Yes' : 'No'}
              </span>
            </label>
          </div>

          <div style={{ ...colStyle, flex: 2 }}>
            <button style={editBtn} onClick={() => onEdit(charity)}>✏️ Edit</button>
            <button style={deleteBtn} onClick={() => onDelete(charity.charity_id)}>🗑️ Delete</button>
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

export default CharityTable;
