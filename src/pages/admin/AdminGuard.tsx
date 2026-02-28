import { Outlet } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const AdminGuard = () => {
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <Outlet />;
};

export default AdminGuard;
