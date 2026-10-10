# Roomify - PCCOER Student Living & Mess Full-Stack Solution

A full-stack student accommodation and mess discovery platform built for **Pimpri Chinchwad College of Engineering & Research (PCCOER), Ravet**.

---

## 📁 Project Structure

```
Roomify/
├── Frontend/
│   └── index.html                # Styled Single Page Application with Auth Modal & API Integration
└── backend/
    ├── .env                      # Active environment configuration
    ├── .env.example              # Environment template
    ├── package.json              # Express, Mongoose, JWT, bcryptjs dependencies
    ├── server.js                 # Main Express server with rate limiting & CORS
    ├── seed.js                   # Database seeder with curated PCCOER listings
    ├── models/
    │   ├── User.js               # Mongoose model for Student users
    │   ├── Property.js           # Mongoose model for PG listings (Boys/Girls)
    │   ├── Mess.js               # Mongoose model for Mess/Dining services
    │   └── Inquiry.js            # Mongoose model for Student booking requests
    ├── controllers/
    │   ├── authController.js     # Register, Login, Me endpoints
    │   ├── propertyController.js # PG listing retrieval with filter support
    │   ├── messController.js     # Mess listing retrieval
    │   └── inquiryController.js  # Booking inquiry submission & student history
    ├── routes/
    │   ├── authRoutes.js         # /api/auth routes
    │   ├── propertyRoutes.js     # /api/pgs routes
    │   ├── messRoutes.js         # /api/mess routes
    │   └── inquiryRoutes.js      # /api/inquiries routes
    └── middleware/
        └── auth.js               # JWT bearer verification middleware
```

---

## 🚀 Setup & Launch Instructions

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB**: Either a local instance (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster.

---

### 2. Configure Environment (`.env`)
In `Roomify/backend/`, verify or edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/roomify
JWT_SECRET=roomify_pccoer_jwt_super_secret_key_2026
```
*(If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string).*

---

### 3. Install Backend Dependencies
Open a terminal in `Roomify/backend/`:
```bash
npm install
```

---

### 4. Seed the Database
Populate the database with the curated Ravet / PCCOER listings (Boys/Girls PGs and Mess services):
```bash
node seed.js
```
*Output: Curated listings will be loaded into MongoDB collections.*

---

### 5. Start the Express Backend Server
In `Roomify/backend/`:
```bash
npm start
```
Or for auto-reloading during development:
```bash
npm run dev
```
The server will listen at `http://localhost:5000`.

---

### 6. Launch the Frontend
You can open `Roomify/Frontend/index.html` in your web browser:
- Directly double-click `index.html`, OR
- Use any local web server (e.g., Live Server in VS Code, `npx serve Frontend`, or `python -m http.server 3000`).

---

## 📡 RESTful API Documentation

| Method | Endpoint | Access | Description |
|---|---|---|---|
| **POST** | `/api/auth/register` | Public | Register new student (`fullName`, `email`, `phone`, `academicYear`, `branch`, `password`) |
| **POST** | `/api/auth/login` | Public | Authenticate student via email or phone + password; returns JWT token |
| **GET** | `/api/auth/me` | Protected (JWT) | Get profile of active logged-in student |
| **GET** | `/api/pgs` | Public | Fetch PG listings; supports `?filter=all\|boys\|girls\|closest` |
| **GET** | `/api/pgs/:id` | Public | Fetch single PG details |
| **GET** | `/api/mess` | Public | Fetch Mess / Meal dining services |
| **GET** | `/api/mess/:id` | Public | Fetch single Mess details |
| **POST** | `/api/inquiries` | Protected (JWT) | Submit booking inquiry for a PG or Mess |
| **GET** | `/api/inquiries/my` | Protected (JWT) | Retrieve inquiries submitted by the logged-in student |
