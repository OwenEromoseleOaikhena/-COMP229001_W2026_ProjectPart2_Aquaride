// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Boat model - core listing entity for AquaRide
// ============================================================

const mongoose = require('mongoose');

// Boat schema - the primary entity in AquaRide
const boatSchema = new mongoose.Schema(
  {
    // Title / name of the boat listing
    title: {
      type: String,
      required: [true, 'Boat title is required'],
      trim: true,
    },
    // Description / details of the boat
    description: {
      type: String,
      required: [true, 'Boat description is required'],
    },
    // Status field: active = available for booking, inactive = unlisted
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
    boatType: {
      type: String,
      enum: ['speedboat', 'sailboat', 'yacht', 'ferry', 'kayak', 'other'],
      required: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: 1,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
      min: 0,
    },
    location: {
      type: String,
      required: [true, 'Location / marina is required'],
    },
    // Reference to the captain who owns this listing
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // When the listing becomes active
    availableFrom: {
      type: Date,
      default: Date.now,
    },
    // Optional expiry date for the listing
    availableUntil: {
      type: Date,
    },
    // History / audit trail of all changes to this boat listing
    history: [
      {
        username: { type: String, required: true },
        action: { type: String, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Boat', boatSchema);
