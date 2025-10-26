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
// Use CLIENT_URL env var (can be comma-separated list like "http://localhost:3000,https://homeverse-1.onrender.com")
const clientUrls = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean);

// CORS middleware: allow listed origins; allow requests without origin (curl, server-to-server)
// Also automatically allow Render-hosted frontends (*.onrender.com) when running in production
app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser or same-origin requests (no origin header)
    if (!origin) return callback(null, true);

    // allow explicit client URLs from CLIENT_URL
    if (clientUrls.includes(origin)) return callback(null, true);

    // allow Render deployments automatically when in production
    if (process.env.NODE_ENV === 'production' && origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }

    // allow if Render provided the external URL of this service
    if (process.env.RENDER_EXTERNAL_URL && origin === process.env.RENDER_EXTERNAL_URL) {
      return callback(null, true);
    }

    // Otherwise block and log for debugging
    console.warn(`Blocked CORS origin: ${origin}`);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

// handle preflight for all routes using regex pattern (Express 5 compatibility)
app.options(/.*/, cors());
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
