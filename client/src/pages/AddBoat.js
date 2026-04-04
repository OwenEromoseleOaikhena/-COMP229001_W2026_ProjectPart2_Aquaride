// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: AddBoat page - protected form for captains to create a boat listing
// ============================================================

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const AddBoat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    boatType: 'speedboat',
    capacity: '',
    pricePerHour: '',
    location: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await axios.post('/api/boats', formData);
      setSuccess('Boat listed successfully!');
      setTimeout(() => navigate('/my-boats'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only captains can access this page
  if (user?.role !== 'captain') {
    return (
      <div className="container py-5 text-center">
        <div className="fs-1">⛔</div>
        <h4 className="mt-3">Captains Only</h4>
        <p className="text-muted">You need a captain account to list a boat.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="d-flex align-items-center mb-4">
            <Link to="/my-boats" className="btn btn-outline-secondary btn-sm me-3">← Back</Link>
            <h2 className="fw-bold mb-0">List a New Boat</h2>
          </div>

          <div className="card shadow border-0 p-4">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Boat Name / Title</label>
                <input
                  type="text" name="title" className="form-control"
                  placeholder="e.g. Sea Breeze Speedboat"
                  value={formData.title} onChange={handleChange} required
                />
              </div>

              {/* Boat Type */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Boat Type</label>
                <select name="boatType" className="form-select" value={formData.boatType} onChange={handleChange}>
                  <option value="speedboat">Speedboat</option>
                  <option value="sailboat">Sailboat</option>
                  <option value="yacht">Yacht</option>
                  <option value="pontoon">Pontoon</option>
                  <option value="kayak">Kayak</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Capacity and Price side by side */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Capacity (guests)</label>
                  <input
                    type="number" name="capacity" className="form-control"
                    placeholder="e.g. 6" min="1" max="50"
                    value={formData.capacity} onChange={handleChange} required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Price Per Hour ($)</label>
                  <input
                    type="number" name="pricePerHour" className="form-control"
                    placeholder="e.g. 120" min="1"
                    value={formData.pricePerHour} onChange={handleChange} required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Location / Marina</label>
                <input
                  type="text" name="location" className="form-control"
                  placeholder="e.g. Toronto Harbour, Ontario"
                  value={formData.location} onChange={handleChange} required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description" className="form-control" rows="3"
                  placeholder="Describe your boat, amenities, rules..."
                  value={formData.description} onChange={handleChange} required
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow-1" disabled={loading}>
                  {loading ? 'Creating Listing...' : '🚤 List My Boat'}
                </button>
                <Link to="/my-boats" className="btn btn-outline-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBoat;
