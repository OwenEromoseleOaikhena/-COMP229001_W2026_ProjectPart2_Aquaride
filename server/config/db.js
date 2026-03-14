// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: MongoDB Atlas database connection configuration
// ============================================================

const mongoose = require('mongoose');

// Connect to MongoDB Atlas using the URI from .env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
