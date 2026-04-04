// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Dashboard - secure page for authenticated passengers and captains
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">Welcome back, {user?.username} 👋</h2>
      <p className="text-muted mb-4">
        You are logged in as a <span className="badge bg-primary">{user?.role}</span>
      </p>

      {/* Passenger dashboard */}
      {user?.role === 'passenger' && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">🚤</div>
              <h5 className="fw-bold">Browse Boats</h5>
              <p className="text-muted">Find and book available boats near you.</p>
              <Link to="/boats" className="btn btn-primary mt-auto">Browse Now</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">📋</div>
              <h5 className="fw-bold">My Trips</h5>
              <p className="text-muted">View and manage your booked trips.</p>
              <button className="btn btn-outline-primary mt-auto" disabled>Coming Soon</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">👤</div>
              <h5 className="fw-bold">My Profile</h5>
              <p className="text-muted">Update your personal information.</p>
              <button className="btn btn-outline-primary mt-auto" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      )}

      {/* Captain dashboard */}
      {user?.role === 'captain' && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">➕</div>
              <h5 className="fw-bold">List a Boat</h5>
              <p className="text-muted">Add your boat and start offering rides.</p>
              <Link to="/add-boat" className="btn btn-primary mt-auto">Add Boat</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">⛵</div>
              <h5 className="fw-bold">My Boats</h5>
              <p className="text-muted">Manage your boat listings and statuses.</p>
              <Link to="/my-boats" className="btn btn-outline-primary mt-auto">Manage Boats</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100">
              <div className="fs-1 mb-2">📊</div>
              <h5 className="fw-bold">Trip Requests</h5>
              <p className="text-muted">View and manage incoming trip bookings.</p>
              <button className="btn btn-outline-primary mt-auto" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
