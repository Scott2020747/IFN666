// src/models/MaterialModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    name: { type: String, required: true },
    costPerUnit: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Material', MaterialSchema);
