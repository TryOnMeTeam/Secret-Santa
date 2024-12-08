import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTE_PATH } from '../constants/secretSantaConstants';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ ROUTE_PATH.LOGIN} replace />;
  }

  return element;
};

export default ProtectedRoute;
