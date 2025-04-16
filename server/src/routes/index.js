// src/routes/index.js
const express = require('express');
const router = express.Router();

const projectRoutes = require('./ProjectRoutes');
const materialRoutes = require('./MaterialRoutes');
const labourRoutes = require('./LabourRoutes');
const authRoutes = require('./AuthRoutes'); // Include the auth routes

// Mount routes under /api
router.use('/projects', projectRoutes);
router.use('/materials', materialRoutes);
router.use('/labour', labourRoutes);
router.use('/auth', authRoutes);



module.exports = router;
