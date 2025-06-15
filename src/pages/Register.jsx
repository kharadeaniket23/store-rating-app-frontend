import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user', // default to Normal User
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { name, email, address, password, role } = formData;

    if (!name || !email || !address || !password || !role) {
      setError('All fields are required');
      return false;
    }

    if (name.length < 2 || name.length > 60) {
      setError('Name must be between 2 and 60 characters');
      return false;
    }

    if (address.length > 400) {
      setError('Address must be less than 400 characters');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be 8-16 characters, include 1 uppercase and 1 special character');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('https://store-rating-app-backend.onrender.com/api/auth/register', formData);

      setSuccessMsg('Registration successful. Redirecting...');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-3">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              className="w-full border p-2 rounded"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">Normal User</option>
              <option value="owner">Store Owner</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
