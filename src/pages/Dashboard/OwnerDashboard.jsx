import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [storeInfo, setStoreInfo] = useState({
    averageRating: 0,
    ratings: [],
  });

  useEffect(() => {
    const fetchStoreRatings = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'https://store-rating-app-backend.onrender.com/api/owner/store-ratings',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStoreInfo(res.data);
      } catch (err) {
        console.error('Error fetching store ratings:', err);
      }
    };

    fetchStoreRatings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">🏪 Welcome, {user?.name}</h1>

        <div className="bg-white shadow p-4 rounded mb-6">
          <h2 className="text-xl font-semibold">⭐ Average Store Rating</h2>
          <p className="text-3xl mt-2 text-yellow-500">{storeInfo.averageRating.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">👥 Users Who Rated Your Store</h2>
          {storeInfo.ratings.length === 0 ? (
            <p>No ratings yet.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">User Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {storeInfo.ratings.map((rating, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{rating.userName}</td>
                    <td className="px-4 py-2">{rating.userEmail}</td>
                    <td className="px-4 py-2 text-yellow-500">{rating.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
