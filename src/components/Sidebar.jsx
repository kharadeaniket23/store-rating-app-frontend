import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">📊 Dashboard</h2>

      {user?.role === 'admin' && (
        <>
          <Link to="/admin" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/admin/stores" className="block hover:bg-gray-700 p-2 rounded">Manage Stores</Link>
          <Link to="/admin/users" className="block hover:bg-gray-700 p-2 rounded">Manage Users</Link>
        </>
      )}

      {user?.role === 'user' && (
        <>
          <Link to="/user" className="block hover:bg-gray-700 p-2 rounded">Browse Stores</Link>
          <Link to="/user/ratings" className="block hover:bg-gray-700 p-2 rounded">My Ratings</Link>
        </>
      )}

      {user?.role === 'owner' && (
        <>
          <Link to="/owner" className="block hover:bg-gray-700 p-2 rounded">Store Ratings</Link>
        </>
      )}

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
