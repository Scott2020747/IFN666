// src/routes/LabourRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const labourController = require('../controllers/LabourController');
const { verifyToken } = require('../middleware/auth');

const validateLabour = [
  body('workerName').notEmpty().withMessage('Worker name is required'),
  body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
  body('hoursWorked').isNumeric().withMessage('Hours worked must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.get('/', verifyToken, labourController.getAllLabour);
router.get('/:id', verifyToken, labourController.getLabourById);
router.post('/', verifyToken, validateLabour, labourController.createLabour);
router.put('/:id', verifyToken, labourController.updateLabour);
router.delete('/:id', verifyToken, labourController.deleteLabour);

module.exports = router;