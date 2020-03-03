const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  photo: String,
  currentDriver: String,
  location: { 
    coords: { 
      lat: Number,
      lng: Number 
    }
  }
});

module.exports = Vehicle = mongoose.model('Vehicle', vehicleSchema)