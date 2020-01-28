const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const trips = require('../mockdb-data/trips.json')
const TripModel = require('../models/Trip')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get(`/trips`, (req, res) => {
  res.json({ trips })
  return res.end()
})

router.post(`/newtrip`, (req, res) => {
  const newTrip = {
    tripID: 4,
    pickupTime: req.body.pickupTime,
    pickup: {
      city: req.body.city,
      state: req.body.state,
      street: req.body.street
    },
    suggestedDriver: "",
  }
  trips.unshift(newTrip)
  return res.send(trips)
})

router.post(`/new-trip`, (req, res) => {
  const { 
    trip_type, 
    pu_date, 
    pu_time, 
    pu_street1, 
    pu_street2, 
    pu_city, 
    pu_state, 
    pu_zipcode, 
    do_date,
    do_time,
    do_street1,
    do_street2,
    do_city,
    do_state,
    do_zipcode,
    suggestedDriver,
    assignedDriver,
    assignedVehicle,
  } = req.body

  const newTrip = new TripModel({ 
    tripType: trip_type,
    pickupDate: pu_date,
    pickupTime: pu_time,
    pickupAddr: {
      street1: pu_street1,
      street2: pu_street2,
      city: pu_city,
      state: pu_state,
      zipcode: pu_zipcode,
      coords: {
        lat: null,
        lng: null,
      }
    },
    dropoffDate: do_date,
    dropoffTime: do_time,
    dropoffAddr: {
      street1: do_street1,
      street2: do_street2,
      city: do_city,
      state: do_state,
      zipcode: do_zipcode,
      coords: {
        lat: null,
        lng: null,
      },
      suggestedDrivers: suggestedDriver,
      assignedDriver: assignedDriver,
      assignedVehicle: assignedVehicle,
   }})

   newTrip.save(function(err) {
     if(err) console.error(err);
    })
    res.send({ message: `A new trip was saved!`});
    res.end()
})

module.exports = router;