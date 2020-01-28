const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  street1: String,
  street2: String,
  city: String,
  state: String,
  zipcode: String,
  image: String,
});

driverSchema.virtual('fullName')
  .get(function() { return this.name.first + ' ' + this.name.last })

module.exports = Driver = mongoose.model('Driver', driverSchema)