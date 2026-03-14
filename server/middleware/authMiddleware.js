// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: JWT authentication middleware - protects secure routes
// ============================================================

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to restrict access to captains only
const captainOnly = (req, res, next) => {
  if (req.user && req.user.role === 'captain') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Captains only' });
  }
};

module.exports = { protect, captainOnly };
