// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: PrivateRoute - redirects unauthenticated users to login
// ============================================================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wraps protected pages - redirects to /login if not authenticated
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
