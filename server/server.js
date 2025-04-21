// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: 'https://n11916095.ifn666.com', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS'
}));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

// Rate limiting middleware: maximum of 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/constructionCost', {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use API routes under /api/v1
app.use('/api/v1', routes);

// Root route for GET /
app.get('/api/v1', (req, res) => {
  res.send('Welcome to the Construction Cost Estimator API!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});