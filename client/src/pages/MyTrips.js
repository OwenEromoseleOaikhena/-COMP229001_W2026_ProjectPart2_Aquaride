// Student ID: 301475618
// App: AquaRide
// Description: MyTrips page - passengers can view their trip bookings

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axios.get('/api/trips/my');
        setTrips(data);
      } catch (err) {
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Trips</h2>
          <p className="text-muted mb-0">View and manage your boat ride bookings</p>
        </div>
        <Link to="/boats" className="btn btn-primary">+ Book a Ride</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
      {!loading && trips.length === 0 && (
        <div className="text-center py-5">
          <div className="fs-1">🚤</div>
          <p className="text-muted mt-2">You have not booked any trips yet.</p>
          <Link to="/boats" className="btn btn-primary">Browse Available Boats</Link>
        </div>
      )}
      {trips.map((trip) => (
        <div key={trip._id} className="card shadow-sm border-0 mb-3">
          <div className="card-body p-4">
            <h5 className="fw-bold">{trip.title}</h5>
            <p className="text-muted small">Status: {trip.status}</p>
            <p className="text-muted small">From: {trip.pickupLocation} To: {trip.dropoffLocation}</p>
            <p className="text-muted small">Date: {new Date(trip.scheduledAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTrips;
