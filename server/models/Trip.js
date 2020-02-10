const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
  tripType: { type: String, required: true },
  puDate: { type: String, required: true },
  puTime: { type: String, required: true },
  puAddr: { type: String, required: true },
  suggestedDrivers: String,
  assignedDriver: String,
  assignedVehicle: String,
});

module.exports = Trip = mongoose.model('Trip', tripSchema)