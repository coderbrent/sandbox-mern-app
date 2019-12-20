const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DriverSchema = new Schema({
  driverName: {
    type: String,
  },
  driverEmail: {
    type: String,
  },
  driverPhone: {
    type: String,
  },
  driverAddress: {
    type: String,
    body: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      zipcode: String,
    }
  }
});

DriverSchema.pre('save', function(next) {
  console.log('user input was validated on the server...')
  next();
})

module.exports = Driver = mongoose.model('Driver', DriverSchema)