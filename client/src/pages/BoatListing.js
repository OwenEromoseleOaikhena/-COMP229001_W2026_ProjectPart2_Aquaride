// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: BoatListing page - public page showing all active boats
// ============================================================

import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const BoatListing = () => {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all active boats on page load
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const { data } = await axios.get('/api/boats');
        setBoats(data);
      } catch (err) {
        setError('Failed to load boats. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBoats();
  }, []);

  // Status badge color mapping
  const statusBadge = (status) => {
    const map = { active: 'success', inactive: 'secondary', maintenance: 'warning' };
    return map[status] || 'secondary';
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-2">Available Boats</h2>
      <p className="text-muted mb-4">Browse all active boat listings from our verified captains.</p>

      {/* Loading state */}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}

      {/* Error state */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Empty state */}
      {!loading && !error && boats.length === 0 && (
        <div className="text-center py-5 text-muted">
          <div className="fs-1">🚤</div>
          <p>No boats available at the moment. Check back soon!</p>
        </div>
      )}

      {/* Boat cards grid */}
      <div className="row g-4">
        {boats.map((boat) => (
          <div key={boat._id} className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-4">
                {/* Status badge */}
                <span className={`badge bg-${statusBadge(boat.status)} mb-2`}>
                  {boat.status.toUpperCase()}
                </span>
                <h5 className="card-title fw-bold">{boat.title}</h5>
                <p className="text-muted small mb-2">📍 {boat.location}</p>
                <p className="card-text text-muted">{boat.description.substring(0, 100)}...</p>

                <hr />

                {/* Boat details */}
                <div className="d-flex justify-content-between text-muted small">
                  <span>⛵ {boat.boatType}</span>
                  <span>👥 Up to {boat.capacity} guests</span>
                </div>
                <div className="mt-2">
                  <span className="fw-bold text-primary fs-5">${boat.pricePerHour}/hr</span>
                </div>
              </div>
              <div className="card-footer bg-white border-0 p-4 pt-0">
                <Link to="/register" className="btn btn-primary w-100">Book This Boat</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoatListing;
