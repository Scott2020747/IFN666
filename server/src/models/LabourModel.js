// src/models/LabourModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabourSchema = new Schema({
    workerName: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    hoursWorked: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Labour', LabourSchema);
