// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Boat controller - CRUD operations for boat listings
// ============================================================

const Boat = require('../models/Boat');

// @route   GET /api/boats
// @desc    Get all active boats (public)
// @access  Public
const getBoats = async (req, res) => {
  try {
    // Only return active boats for public view
    const boats = await Boat.find({ status: 'active' })
      .populate('captain', 'username email')
      .sort({ createdAt: -1 });
    res.json(boats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/boats/:id
// @desc    Get a single boat by ID (public)
// @access  Public
const getBoatById = async (req, res) => {
  try {
    const boat = await Boat.findById(req.params.id).populate('captain', 'username email');
    if (!boat) return res.status(404).json({ message: 'Boat not found' });
    res.json(boat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/boats
// @desc    Create a new boat listing (captain only)
// @access  Private
const createBoat = async (req, res) => {
  const { title, description, boatType, capacity, pricePerHour, location, availableFrom, availableUntil } = req.body;
  try {
    const boat = await Boat.create({
      title, description, boatType, capacity, pricePerHour,
      location, availableFrom, availableUntil,
      captain: req.user._id,
      // Log creation in history
      history: [{ username: req.user.username, action: 'Created listing', comment: 'Boat listing created' }],
    });
    res.status(201).json(boat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/boats/:id
// @desc    Update a boat listing (owner captain only)
// @access  Private
const updateBoat = async (req, res) => {
  try {
    const boat = await Boat.findById(req.params.id);
    if (!boat) return res.status(404).json({ message: 'Boat not found' });

    // Ensure only the owner captain can update
    if (boat.captain.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    // Update fields
    Object.assign(boat, req.body);

    // Append change to history audit trail
    boat.history.push({
      username: req.user.username,
      action: 'Updated listing',
      comment: req.body.comment || 'Listing updated',
    });

    const updatedBoat = await boat.save();
    res.json(updatedBoat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/boats/:id/status
// @desc    Change boat status (no hard delete allowed)
// @access  Private
const updateBoatStatus = async (req, res) => {
  try {
    const boat = await Boat.findById(req.params.id);
    if (!boat) return res.status(404).json({ message: 'Boat not found' });

    if (boat.captain.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    boat.status = req.body.status;
    // Log status change in history
    boat.history.push({
      username: req.user.username,
      action: `Status changed to ${req.body.status}`,
      comment: req.body.comment || '',
    });

    await boat.save();
    res.json({ message: `Boat status updated to ${req.body.status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/boats/my
// @desc    Get all boats owned by logged-in captain
// @access  Private
const getMyBoats = async (req, res) => {
  try {
    const boats = await Boat.find({ captain: req.user._id }).sort({ createdAt: -1 });
    res.json(boats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBoats, getBoatById, createBoat, updateBoat, updateBoatStatus, getMyBoats };
