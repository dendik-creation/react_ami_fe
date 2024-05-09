import { Navigate, Outlet } from 'react-router-dom';
import { credential } from '../utils/constant';
import toastFire from '../hooks/toastFire';

export const AuthRoutes = ({ children }: any) => {
  if (
    credential == null ||
    new Date() > new Date(credential?.token.expired_at) ||
    credential?.meta?.active_role == null
  ) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const GuestRoutes = ({ children }: any) => {
  if (
    credential &&
    new Date() < new Date(credential?.token.expired_at) &&
    credential?.meta?.active_role != null
  ) {
    toastFire({
      message: 'Sesi Anda Kadaluarsa, Silahkan Login Kembali',
      status: false,
    });
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
