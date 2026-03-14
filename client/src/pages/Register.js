// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Register page - creates new passenger or captain account
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: '', role: 'passenger', phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
      });
      login(data); // Auto-login after registration
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0 p-4">
            <h2 className="text-center fw-bold mb-4">🚤 Join AquaRide</h2>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input type="text" name="username" className="form-control"
                  placeholder="Choose a username" value={formData.username}
                  onChange={handleChange} required />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input type="email" name="email" className="form-control"
                  placeholder="Enter your email" value={formData.email}
                  onChange={handleChange} required />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input type="tel" name="phone" className="form-control"
                  placeholder="Enter your phone number" value={formData.phone}
                  onChange={handleChange} />
              </div>

              {/* Role selection */}
              <div className="mb-3">
                <label className="form-label fw-semibold">I want to join as a...</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="passenger">Passenger (Book rides)</option>
                  <option value="captain">Captain (Offer rides)</option>
                </select>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input type="password" name="password" className="form-control"
                  placeholder="Create a password (min. 6 chars)" value={formData.password}
                  onChange={handleChange} required minLength={6} />
              </div>

              {/* Confirm password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control"
                  placeholder="Confirm your password" value={formData.confirmPassword}
                  onChange={handleChange} required />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
