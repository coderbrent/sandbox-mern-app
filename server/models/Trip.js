const mongoose = require('mongoose')
const polyline = require('@mapbox/polyline')
const geocoder = require('geocoder')
const Schema = mongoose.Schema
const apiKey = process.env.GOOGLE_API_KEY

const tripSchema = new Schema({
  tripType: String,
  date: String,
  pickupTime: String,
  pickupAddr: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    zipcode: String,
    coords: {
      lat: String,
      lng: String,
    }
  },
  dropoffAddr: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    zipcode: String,
    coords: {
      lat: String,
      lng: String,
    },
    suggestedDrivers: String,
    assignedDriver: String,
    assignedVehicle: String,
  },
});

// TODO: geocode coordinates in a `pre-save` hook so all new trips go into db
// with proper lat and lng

// tripSchema.pre('save', async function(error, cb) {
//   if(error) console.error(error);
//   const
//     address = 
//       this.pickupAddr.street1 + ' ' 
//       + this.pickupAddr.street2 + ' '
//       + this.pickupAddr.city + ' '
//       + this.pickupAddr.state + ' '
//       + this.pickupAddr.zipcode

//     await geocoder.geocode(address, (err, data, ) => {
//       if(err) console.error(err);
//       console.log(data)
    
//       // return cb(this.pickupAddr.coords.lat = data.results.geometry.location.lat)
//   })
// })

tripSchema.virtual('fullAddress')
  .get(function() { return this.name.first + ' ' + this.name.last })

module.exports = Trip = mongoose.model('Trip', tripSchema)