// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: MyBoats page - captains can view, edit, and delete their boat listings
// ============================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const MyBoats = () => {
  const { user } = useAuth();
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBoat, setEditingBoat] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch this captain's boats
  const fetchMyBoats = async () => {
    try {
      const { data } = await axios.get('/api/boats/captain/my');
      setBoats(data);
    } catch (err) {
      setError('Failed to load your boats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBoats();
  }, []);

  // Open edit form
  const startEdit = (boat) => {
    setEditingBoat(boat._id);
    setEditForm({
      title: boat.title,
      boatType: boat.boatType,
      capacity: boat.capacity,
      pricePerHour: boat.pricePerHour,
      location: boat.location,
      description: boat.description,
    });
  };

  // Save edits
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/api/boats/${editingBoat}`, editForm);
      setEditingBoat(null);
      fetchMyBoats();
    } catch (err) {
      setError('Failed to update boat. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete / disable boat
  const handleDelete = async (boatId) => {
    if (!window.confirm('Are you sure you want to disable this listing?')) return;
    setDeleteId(boatId);
    try {
      await axios.put(`/api/boats/${boatId}/status`, { status: 'inactive' });
      fetchMyBoats();
    } catch (err) {
      setError('Failed to disable boat. Please try again.');
    } finally {
      setDeleteId(null);
    }
  };

  if (user?.role !== 'captain') {
    return (
      <div className="container py-5 text-center">
        <div className="fs-1">⛔</div>
        <h4 className="mt-3">Captains Only</h4>
        <p className="text-muted">You need a captain account to manage boats.</p>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Boats</h2>
          <p className="text-muted mb-0">Manage your boat listings</p>
        </div>
        <Link to="/add-boat" className="btn btn-primary">+ Add New Boat</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && boats.length === 0 && (
        <div className="text-center py-5">
          <div className="fs-1">⛵</div>
          <p className="text-muted mt-2">You haven't listed any boats yet.</p>
          <Link to="/add-boat" className="btn btn-primary">List Your First Boat</Link>
        </div>
      )}

      {/* Boat list */}
      {boats.map((boat) => (
        <div key={boat._id} className="card shadow-sm border-0 mb-3">
          {editingBoat === boat._id ? (
            /* ---- EDIT FORM ---- */
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Editing: {boat.title}</h5>
              <form onSubmit={handleEditSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Boat Name</label>
                    <input type="text" className="form-control" value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Boat Type</label>
                    <select className="form-select" value={editForm.boatType}
                      onChange={(e) => setEditForm({ ...editForm, boatType: e.target.value })}>
                      <option value="speedboat">Speedboat</option>
                      <option value="sailboat">Sailboat</option>
                      <option value="yacht">Yacht</option>
                      <option value="pontoon">Pontoon</option>
                      <option value="kayak">Kayak</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Capacity</label>
                    <input type="number" className="form-control" value={editForm.capacity}
                      onChange={(e) => setEditForm({ ...editForm, capacity: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Price/hr ($)</label>
                    <input type="number" className="form-control" value={editForm.pricePerHour}
                      onChange={(e) => setEditForm({ ...editForm, pricePerHour: e.target.value })} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Location</label>
                    <input type="text" className="form-control" value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea className="form-control" rows="2" value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} required />
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button type="submit" className="btn btn-success" disabled={saving}>
                    {saving ? 'Saving...' : '✓ Save Changes'}
                  </button>
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => setEditingBoat(null)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            /* ---- VIEW MODE ---- */
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h5 className="fw-bold mb-0">{boat.title}</h5>
                    <span className={`badge bg-${boat.status === 'active' ? 'success' : 'secondary'}`}>
                      {boat.status}
                    </span>
                  </div>
                  <p className="text-muted small mb-1">
                    ⛵ {boat.boatType} &nbsp;·&nbsp; 👥 {boat.capacity} guests &nbsp;·&nbsp;
                    💲{boat.pricePerHour}/hr &nbsp;·&nbsp; 📍 {boat.location}
                  </p>
                  <p className="text-muted small mb-0">{boat.description?.substring(0, 100)}...</p>
                </div>
                <div className="d-flex gap-2 flex-shrink-0 ms-3">
                  <button className="btn btn-outline-primary btn-sm"
                    onClick={() => startEdit(boat)}>Edit</button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(boat._id)}
                    disabled={deleteId === boat._id || boat.status === 'inactive'}>
                    {deleteId === boat._id ? '...' : boat.status === 'inactive' ? 'Disabled' : 'Disable'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBoats;
