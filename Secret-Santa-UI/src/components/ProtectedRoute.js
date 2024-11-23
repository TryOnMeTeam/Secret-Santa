import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
