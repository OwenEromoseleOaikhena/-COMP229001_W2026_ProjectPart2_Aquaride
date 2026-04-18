// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Profile page - allows authenticated users to update their info
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '',
    confirmPassword: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (formData.password && formData.password !== formData.confirmPassword)
      return setError('Passwords do not match');
    setLoading(true);
    try {
      const updateData = { username: formData.username, email: formData.email, phone: formData.phone };
      if (formData.password) updateData.password = formData.password;
      const { data } = await axios.put('/api/auth/profile', updateData);
      login(data);
      setSuccess('Profile updated successfully!');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="fw-bold mb-4">👤 My Profile</h2>
          <div className="card shadow border-0 p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
              </div>
              <hr />
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password (optional)</label>
                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Confirm New Password</label>
                <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Saving...' : '💾 Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
