import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState({}); // { storeId: rating }

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(
          'https://store-rating-app-backend.onrender.com/api/user/stores',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStores(res.data.stores || []);
        setRatings(res.data.userRatings || {});
      } catch (err) {
        console.error('Failed to fetch stores:', err);
      }
    };

    fetchStores();
  }, []);

  const handleRatingChange = async (storeId, value) => {
    try {
      await axios.post(
        `https://store-rating-app-backend.onrender.com/api/user/rate`,
        { storeId, value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRatings((prev) => ({ ...prev, [storeId]: value }));
    } catch (err) {
      console.error('Failed to submit rating:', err);
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">🏠 Welcome, {user?.name}</h1>

        <input
          type="text"
          placeholder="🔍 Search by store name or address"
          className="mb-4 w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <div key={store.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600 mb-2">{store.address}</p>
              <p className="text-yellow-500 font-bold mb-2">
                Average Rating: {store.avgRating?.toFixed(1) || 'No ratings yet'}
              </p>

              <label className="block mb-1">Your Rating:</label>
              <select
                className="border p-1 rounded"
                value={ratings[store.id] || ''}
                onChange={(e) => handleRatingChange(store.id, Number(e.target.value))}
              >
                <option value="">Rate...</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
