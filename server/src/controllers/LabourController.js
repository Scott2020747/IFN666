// src/controllers/LabourController.js
const Labour = require('../models/LabourModel'); // Using the LabourModel

exports.getAllLabour = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const labourEntries = await Labour.find()
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Labour.countDocuments();
    res.status(200).json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      labour: labourEntries
    });
  } catch (err) {
    next(err);
  }
};

exports.getLabourById = async (req, res, next) => {
  try {
    const labour = await Labour.findById(req.params.id);
    if (!labour) {
      return res.status(404).json({ message: 'Labour entry not found' });
    }
    res.status(200).json(labour);
  } catch (err) {
    next(err);
  }
};

exports.createLabour = async (req, res, next) => {
  try {
    const labour = new Labour(req.body);
    const savedLabour = await labour.save();
    res.status(201).json(savedLabour);
  } catch (err) {
    next(err);
  }
};

exports.updateLabour = async (req, res, next) => {
  try {
    const updatedLabour = await Labour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLabour) {
      return res.status(404).json({ message: 'Labour entry not found' });
    }
    res.status(200).json(updatedLabour);
  } catch (err) {
    next(err);
  }
};

exports.deleteLabour = async (req, res, next) => {
  try {
    const deletedLabour = await Labour.findByIdAndRemove(req.params.id);
    if (!deletedLabour) {
      return res.status(404).json({ message: 'Labour entry not found' });
    }
    res.status(200).json({ message: 'Labour entry deleted successfully' });
  } catch (err) {
    next(err);
  }
};