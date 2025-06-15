import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">🏪 Store Rating</Link>
      </h1>

      <div className="space-x-4">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}

        {isAuthenticated && user?.role === 'admin' && (
          <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
        )}

        {isAuthenticated && user?.role === 'user' && (
          <Link to="/user" className="hover:underline">User Dashboard</Link>
        )}

        {isAuthenticated && user?.role === 'owner' && (
          <Link to="/owner" className="hover:underline">Owner Dashboard</Link>
        )}

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
