import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Check authentication status (for example, checking if email and password are in localStorage)
  const isAuthenticated = !!localStorage.getItem('email') && !!localStorage.getItem('password');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
