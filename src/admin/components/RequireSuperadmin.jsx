import { Navigate } from 'react-router-dom';

const RequireSuperadmin = ({ children }) => {
  const admin = JSON.parse(sessionStorage.getItem('admin'));
  if (!admin || admin.admin_role !== 'superadmin') {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};


export default RequireSuperadmin;
