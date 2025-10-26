const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration - allow requests from client URL and from same origin (for production)
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.BASE_URL || `https://homeverse-1.onrender.com`,
  'http://localhost:3000'
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/contact', require('./routes/contact'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware (must come before catch-all route)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Serve static files from React build
const clientBuildPath = path.join(__dirname, '../client/build');

// Serve static files from React build (JS, CSS, images, etc.)
app.use(express.static(clientBuildPath));

// Serve React app for all non-API routes (client-side routing)
// This serves index.html for any route that's not an API route
app.get(/.*/, (req, res) => {
  // If it's an API route that wasn't matched, return 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Route not found' });
  }
  
  // If headers were already sent (e.g., by static middleware), skip
  if (res.headersSent) {
    return;
  }
  
  // Serve the React app (index.html) for client-side routing
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
});
