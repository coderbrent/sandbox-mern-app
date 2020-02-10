const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
  seniority: String,
});

driverSchema.virtual('fullName')
  .get(function() { return `${this.first_name} ${this.last_name}` })

module.exports = Driver = mongoose.model('Driver', driverSchema)