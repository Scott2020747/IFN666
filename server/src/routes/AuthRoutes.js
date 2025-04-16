// src/routes/AuthRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// POST /api/v1/auth/login - user login and token generation

// Register a new user
router.post('/register', authController.register);

// Login (existing)
router.post('/login', authController.login);

module.exports = router;
