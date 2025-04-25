// src/models/ProjectModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    estimatedCost: Number,
    // One-to-many relationship: a project can have multiple materials and labour entries.
    materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
   // labour: [{ type: Schema.Types.ObjectId, ref: 'Labour' }], --> avoid labour to simplify the model
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
