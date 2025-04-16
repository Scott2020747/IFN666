// src/routes/MaterialRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const materialController = require('../controllers/MaterialController');
const { verifyToken } = require('../middleware/auth');

const validateMaterial = [
  body('name').notEmpty().withMessage('Material name is required'),
  body('costPerUnit').isNumeric().withMessage('Cost per unit must be a number'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.get('/', verifyToken, materialController.getAllMaterials);
router.get('/:id', verifyToken, materialController.getMaterialById);
router.post('/', verifyToken, validateMaterial, materialController.createMaterial);
router.put('/:id', verifyToken, materialController.updateMaterial);
router.delete('/:id', verifyToken, materialController.deleteMaterial);

module.exports = router;
