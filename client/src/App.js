// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Main React App component with routing setup
// ============================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';

// Page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BoatListing from './pages/BoatListing';
import AddBoat from './pages/AddBoat';
import MyBoats from './pages/MyBoats';
import Profile from './pages/Profile';
import MyTrips from './pages/MyTrips';

// Component imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/boats" element={<BoatListing />} />

          {/* Protected routes - require login */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-boat" element={<PrivateRoute><AddBoat /></PrivateRoute>} />
          <Route path="/my-boats" element={<PrivateRoute><MyBoats /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/my-trips" element={<PrivateRoute><MyTrips /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;