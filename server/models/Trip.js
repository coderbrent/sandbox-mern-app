const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
  tripType: { type: String, required: true },
  puDate: { type: String, required: true },
  puTime: { type: String, required: true },
  puAddr: {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    text_address: {
      type: String,
    }
  },
  suggestedDrivers: String,
  assignedDriver: String,
  assignedVehicle: String,
});

module.exports = Trip = mongoose.model('Trip', tripSchema)