// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Main Express server entry point for AquaRide backend
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware: parse JSON request bodies
app.use(express.json());

// Middleware: enable CORS for React frontend on port 3000
app.use(cors({ origin: ['http://localhost:3000', 'https://aquaride-psi.vercel.app'], credentials: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));   // Auth: register, login, profile
app.use('/api/boats', require('./routes/boatRoutes'));  // Boats: public + protected

// Landing route - confirms server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AquaRide API' });
});

// Start server on defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AquaRide server running on port ${PORT}`);
});
