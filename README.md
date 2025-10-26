# Homeverse - Full-Stack Real Estate Application

A modern, full-stack real estate platform built with React, Node.js, Express, and MongoDB. Features dynamic property listings, user authentication, and property management with Indian localization (₹ INR currency, Indian addresses, and phone numbers).

## 🎯 Features

### User Features
- ✅ **User Authentication**: Register and login with JWT-based auth
- 🏠 **Browse Properties**: View all properties dynamically from MongoDB
- 🔍 **Property Details**: Detailed view with image gallery, agent info
- 📞 **Contact Agent**: Submit inquiries for properties
- ₹ **Indian Localization**: INR currency, Indian cities, phone format (+91-XXXXXXXXXX)

### Authenticated User Features
- ➕ **Add Properties**: Create new property listings with image uploads
- ✏️ **Edit Properties**: Update your own property listings
- 🗑️ **Delete Properties**: Remove your listings
- 📋 **My Properties**: Manage all your property listings

### Technical Features
- 🔐 JWT authentication with protected routes
- 📤 Image upload with multer (up to 8 images per property)
- 🎨 Exact design replication from original Homeverse
- 📱 Fully responsive design
- 🔄 Real-time validation (client & server)
- 🎯 Owner-only property editing/deletion
- 🌐 CORS-enabled API

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Install MongoDB and Start the Service

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB
# Or if installed manually, run:
mongod --dbpath="C:\data\db"
```

### 2. Clone/Navigate to Project
```powershell
cd C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack
```

### 3. Backend Setup

```powershell
# Navigate to server directory
cd server

# Install dependencies (already done)
npm install

# Start the server
npm run dev
```

The server will run on **http://localhost:5000**

### 4. Seed Database (First Time Only)

In a new terminal:
```powershell
cd C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack\server
npm run seed
```

This creates:
- Demo user: **rajesh@homeverse.in** / **password123**
- 8 sample properties with Indian locations

### 5. Frontend Setup

```powershell
# Navigate to client directory
cd C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack\client

# Initialize React app
npx create-react-app .

# Install dependencies
npm i react-router-dom axios react-toastify

# Copy assets from original project
# From PowerShell:
xcopy "C:\Users\saksh\Desktop\homeverse-master\homeverse-master\homeverse-master\assets" "C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack\client\public\assets" /E /I /Y

# Create .env file
New-Item .env -ItemType File
# Add this line to .env:
# REACT_APP_API_URL=http://localhost:5000
```

### 6. Start Frontend

```powershell
# In client directory
npm start
```

The app will open at **http://localhost:3000**

## 📁 Project Structure

```
homeverse-fullstack/
├── server/                  # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── models/
│   │   ├── User.js         # User schema
│   │   ├── Property.js     # Property schema
│   │   └── Contact.js      # Contact inquiry schema
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── properties.js   # Property CRUD routes
│   │   └── contact.js      # Contact form routes
│   ├── uploads/            # Uploaded property images
│   ├── server.js           # Express app entry
│   ├── seed.js             # Database seeding script
│   ├── .env                # Environment variables
│   └── package.json
│
├── client/                  # Frontend (React)
│   ├── public/
│   │   └── assets/         # CSS, images, fonts from original design
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js      # Axios instance with interceptors
│   │   ├── components/     # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── PropertyList.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── PropertyDetails.jsx
│   │   │   ├── MyProperties.jsx
│   │   │   ├── AddProperty.jsx
│   │   │   └── EditProperty.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth state management
│   │   ├── routes/
│   │   │   └── PrivateRoute.jsx  # Protected route wrapper
│   │   ├── utils/
│   │   │   └── format.js   # INR, phone, date formatters
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (protected)

### Properties
- `GET /api/properties` - Get all properties (public)
  - Query params: `propertyType`, `location`, `page`, `limit`, `ownerId`
- `GET /api/properties/:id` - Get single property (public)
- `POST /api/properties` - Create property (protected, with image upload)
- `PUT /api/properties/:id` - Update property (protected, owner only)
- `DELETE /api/properties/:id` - Delete property (protected, owner only)

### Contact
- `POST /api/contact` - Submit contact inquiry (public)
- `GET /api/contact` - Get all inquiries (public, should be protected in production)

## 🌏 Indian Localization

- **Currency**: All prices displayed in ₹ (INR) with Indian number formatting
- **Phone Numbers**: Format: +91-XXXXXXXXXX (10 digits starting with 6-9)
- **Locations**: Indian cities and addresses (Mumbai, Delhi, Bengaluru, etc.)
- **Validation**: Server-side validation for Indian phone numbers

## 🔐 Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/homeverse
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🎨 Design

The project maintains the exact visual design of the original Homeverse template:
- Same CSS classes and styling
- Ionicons for icons
- Google Fonts (Nunito Sans, Poppins)
- Responsive breakpoints
- Color scheme preserved

## 👥 Demo Credentials

After running `npm run seed`:
- **Email**: rajesh@homeverse.in
- **Password**: password123

## 🛠️ Development

```powershell
# Backend (with auto-restart)
cd server
npm run dev

# Frontend (with hot reload)
cd client
npm start
```

## 📦 Production Build

```powershell
# Build React app
cd client
npm run build

# The build folder can be deployed to any static hosting
# Configure REACT_APP_API_URL to your production API URL
```

## ❗ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running: `net start MongoDB`
- Check connection string in `.env`

### CORS Error
- Verify `CLIENT_URL` in server `.env` matches your frontend URL
- Check if both servers are running

### Image Upload Not Working
- Verify `uploads` folder exists in server directory
- Check file size (max 5MB per image)
- Ensure proper file types (jpg, jpeg, png, webp)

### Port Already in Use
```powershell
# Find and kill process on port 5000 or 3000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 📝 Notes for Frontend Implementation

The frontend React code needs to be implemented with these key files:

1. **src/api/api.js** - Axios with JWT interceptors
2. **src/context/AuthContext.js** - Global auth state
3. **src/utils/format.js** - INR and phone formatters
4. **src/components/** - All UI components matching original design
5. **src/pages/** - Page-level components
6. **src/App.js** - Router setup with react-router-dom

Refer to the original HTML/CSS for exact class names and structure to maintain design consistency.

## 📄 License

This project is free to use for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for the Indian Real Estate Market**
# HomeVerse
