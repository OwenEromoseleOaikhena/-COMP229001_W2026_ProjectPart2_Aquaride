// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Home page - public landing page for AquaRide
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-3 fw-bold">🚤 AquaRide</h1>
          <p className="lead fs-4">Your on-demand boat ride platform. Explore the water, your way.</p>
          <div className="mt-4">
            <Link to="/boats" className="btn btn-light btn-lg me-3">Browse Boats</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">How AquaRide Works</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <div className="fs-1 mb-3">🔍</div>
                <h4 className="fw-bold">Browse Boats</h4>
                <p className="text-muted">Explore available boats from verified captains near your marina.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <div className="fs-1 mb-3">📅</div>
                <h4 className="fw-bold">Book a Ride</h4>
                <p className="text-muted">Select your pickup and dropoff, schedule your trip, and confirm your booking.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4">
                <div className="fs-1 mb-3">⚓</div>
                <h4 className="fw-bold">Ride the Waves</h4>
                <p className="text-muted">Your captain arrives, and you enjoy a smooth water journey to your destination.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to set sail?</h2>
          <p className="text-muted mb-4">Join AquaRide as a passenger or list your boat as a captain.</p>
          <Link to="/register" className="btn btn-primary btn-lg me-3">Sign Up as Passenger</Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">Register as Captain</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
