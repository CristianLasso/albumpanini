import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}
