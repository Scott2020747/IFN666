// src/controllers/MaterialController.js
const Material = require('../models/MaterialModel');

// GET all materials with pagination and optional filtering by name
exports.getAllMaterials = async (req, res, next) => {
  try {
    // Destructure query parameters with default values
    let { page = 1, limit = 10, name } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Build a query object; add name filtering if provided (case-insensitive)
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const materials = await Material.find(query)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Material.countDocuments(query);

    res.status(200).json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      materials
    });
  } catch (err) {
    next(err);
  }
};

// GET a material by ID
exports.getMaterialById = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (err) {
    next(err);
  }
};

// POST create a new material
exports.createMaterial = async (req, res, next) => {
  try {
    const material = new Material(req.body);
    const savedMaterial = await material.save();
    res.status(201).json(savedMaterial);
  } catch (err) {
    next(err);
  }
};

// PUT update an existing material
exports.updateMaterial = async (req, res, next) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json(updatedMaterial);
  } catch (err) {
    next(err);
  }
};

// DELETE remove a material
exports.deleteMaterial = async (req, res, next) => {
  try {
    const deletedMaterial = await Material.findByIdAndRemove(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (err) {
    next(err);
  }
};