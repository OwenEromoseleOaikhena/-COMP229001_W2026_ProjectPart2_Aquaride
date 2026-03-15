# 🚤 AquaRide
**COMP229 – Web Application Development | Group Project**
Student: Owen Oaikhena | 301475618

AquaRide is an Uber-for-boats MERN stack web application where Captains list boats and Passengers book rides.

---

## 🗂 Project Structure
```
aquaride/
├── server/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Route logic (auth, boats, trips)
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # Mongoose schemas (User, Boat, Trip)
│   ├── routes/         # Express API routes
│   └── server.js       # Entry point
├── client/
│   └── src/
│       ├── assets/css/ # Stylesheets
│       ├── components/ # Navbar, Footer, PrivateRoute
│       ├── context/    # AuthContext (global state)
│       └── pages/      # Home, Login, Register, Dashboard, BoatListing
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/aquaride.git
cd aquaride
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client && npm install && cd ..
```

### 4. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `MONGO_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string

### 5. Run the app (both backend and frontend)
```bash
npm run dev:full
```
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login and get JWT |
| GET | /api/auth/profile | Private | Get user profile |
| PUT | /api/auth/profile | Private | Update user profile |
| GET | /api/boats | Public | Get all active boats |
| GET | /api/boats/:id | Public | Get single boat |
| POST | /api/boats | Captain only | Create boat listing |
| PUT | /api/boats/:id | Captain only | Update boat listing |
| PUT | /api/boats/:id/status | Captain only | Change boat status |
| GET | /api/boats/captain/my | Captain only | Get my boats |

---

## ☁️ Deployment

### MongoDB Atlas
1. Go to https://mongodb.com/atlas and create a free cluster
2. Create a database user and whitelist your IP (0.0.0.0/0 for Render)
3. Copy the connection string into your `.env` as `MONGO_URI`

### Render (Backend)
1. Push code to GitHub
2. Go to https://render.com and create a new **Web Service**
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node server/server.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`

---

## 📋 Agile Tracking
https://trello.com/b/kBSVouIJ/aquaride-project-board
---

## 🛠 Tech Stack
- **MongoDB Atlas** — Cloud database
- **Express.js** — Backend framework
- **React.js** — Frontend framework
- **Node.js** — Runtime environment
- **Bootstrap 5** — Responsive UI
- **JWT** — Authentication
- **Render** — Cloud hosting
