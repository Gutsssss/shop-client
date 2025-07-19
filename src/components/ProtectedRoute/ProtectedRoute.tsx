import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAppSelector(state => state.userReducer);

  if (!isAuth) {
    return <Navigate to="/Login" state={{ from: window.location.pathname }} replace />;
  }

  return children;
};