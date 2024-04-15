import { Navigate, Outlet } from 'react-router-dom';
import { credential } from '../utils/constant';

export const AuthRoutes = ({ children }: any) => {
  if (!credential || new Date() > new Date(credential?.token.expired_at)) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const GuestRoutes = ({ children }: any) => {
  if (credential && new Date() < new Date(credential?.token.expired_at)) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
