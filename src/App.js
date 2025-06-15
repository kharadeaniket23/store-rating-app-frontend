import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import routes from './routes';

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Function to redirect to the appropriate dashboard
  const getDashboardRoute = () => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin" />;
      case 'store':
        return <Navigate to="/store" />;
      case 'user':
        return <Navigate to="/user" />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home route redirects to respective dashboard */}
        <Route path="/" element={getDashboardRoute()} />

        {/* Dynamically generated routes */}
        {routes.map(({ path, element, isPublic, allowedRoles }) => {
          if (isPublic) {
            return (
              <Route
                key={path}
                path={path}
                element={!isAuthenticated ? element : <Navigate to="/" />}
              />
            );
          }

          return (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute allowedRoles={allowedRoles}>
                  {element}
                </ProtectedRoute>
              }
            />
          );
        })}

        {/* Catch-all unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
