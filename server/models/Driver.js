const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  zipcode: Number,
  image: Object,
});

driverSchema.virtual('fullName')
  .get(function() { return `${this.first_name} ${this.last_name}` })

module.exports = Driver = mongoose.model('Driver', driverSchema)