// src/controllers/ProjectController.js
const Project = require('../models/ProjectModel');

exports.getAllProjects = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, name } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    const projects = await Project.find(query)
      .populate('materials labor')
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Project.countDocuments(query);
    res.status(200).json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      projects
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('materials labor');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
};