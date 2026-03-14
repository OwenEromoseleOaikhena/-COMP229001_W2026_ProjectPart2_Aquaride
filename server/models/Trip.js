// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Trip model - manages ride bookings between passengers and captains
// ============================================================

const mongoose = require('mongoose');

// Trip schema - represents a booking/ride request
const tripSchema = new mongoose.Schema(
  {
    // Title / route name for the trip
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    // Description of the trip details
    description: {
      type: String,
    },
    // Status field tracks the lifecycle of the trip
    status: {
      type: String,
      enum: ['requested', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'requested',
    },
    // Reference to the boat being booked
    boat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boat',
      required: true,
    },
    // Reference to the passenger who made the booking
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Reference to the captain handling the trip
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickupLocation: {
      type: String,
      required: [true, 'Pickup location is required'],
    },
    dropoffLocation: {
      type: String,
      required: [true, 'Dropoff location is required'],
    },
    // When the trip is scheduled to start
    scheduledAt: {
      type: Date,
      required: [true, 'Scheduled date and time is required'],
    },
    // Optional completion date
    completedAt: {
      type: Date,
    },
    totalPrice: {
      type: Number,
      min: 0,
    },
    // Audit trail: history of all status changes and interactions
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

module.exports = mongoose.model('Trip', tripSchema);
