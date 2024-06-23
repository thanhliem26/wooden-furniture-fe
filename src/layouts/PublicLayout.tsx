import { isUserLoggedIn } from '@/utils/index';
import { Navigate, Outlet } from 'react-router-dom';

const PublicLayout = () => {

  if (isUserLoggedIn()) {
    return <Navigate to='/' />
}
  return (
    <Outlet />
  );
};

export default PublicLayout;
