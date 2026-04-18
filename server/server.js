const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://aquaride-psi.vercel.app'], credentials: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boats', require('./routes/boatRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AquaRide API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AquaRide server running on port ${PORT}`);
});
