// src/routes/ProjectRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const projectController = require('../controllers/ProjectController');
const { verifyToken } = require('../middleware/auth');

// Validation middleware function for project creation
const validateProject = [
  body('name').notEmpty().withMessage('Project name is required'),
  body('estimatedCost')
    .optional() // estimatedCost is optional
    .isNumeric().withMessage('Estimated cost must be a number'),
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Define endpoints for projects, applying validation middleware on the POST route
router.post('/', verifyToken, validateProject, projectController.createProject);

// Other CRUD endpoints remain as before
router.get('/', verifyToken, projectController.getAllProjects);
router.get('/:id', verifyToken, projectController.getProjectById);
router.put('/:id', verifyToken, projectController.updateProject);
router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;
