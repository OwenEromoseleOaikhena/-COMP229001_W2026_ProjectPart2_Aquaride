// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Boat routes - public listing and protected captain actions
// ============================================================

const express = require('express');
const router = express.Router();
const { getBoats, getBoatById, createBoat, updateBoat, updateBoatStatus, getMyBoats } = require('../controllers/boatController');
const { protect, captainOnly } = require('../middleware/authMiddleware');

// Public routes - anyone can view active boats
router.get('/', getBoats);
router.get('/:id', getBoatById);

// Protected routes - only authenticated captains
router.get('/captain/my', protect, captainOnly, getMyBoats);
router.post('/', protect, captainOnly, createBoat);
router.put('/:id', protect, captainOnly, updateBoat);
router.put('/:id/status', protect, captainOnly, updateBoatStatus);

module.exports = router;
