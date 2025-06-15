import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://store-rating-app-backend.onrender.com/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6 text-center">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl mt-2 text-blue-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center">
            <h2 className="text-lg font-semibold">Total Stores</h2>
            <p className="text-3xl mt-2 text-green-600">{stats.totalStores}</p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center">
            <h2 className="text-lg font-semibold">Total Ratings</h2>
            <p className="text-3xl mt-2 text-purple-600">{stats.totalRatings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
