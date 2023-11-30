// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element: Component }) => {
  // Check if user is authenticated (e.g., by checking local storage)
  const isAuthenticated = !!localStorage.getItem('email') && !!localStorage.getItem('password');

  return (
    <Route
      path={path}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
