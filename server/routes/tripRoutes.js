const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const trips = require('../mockdb-data/trips.json')
const TripModel = require('../models/Trip')
const Trips = require('../models/Trip')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get(`/get-trips`, (req, res) => {
  Trips.find({}, (err, docs) => {
    if(err) throw err
    return res.json(docs)
  })
})

router.post(`/add-trip`, (req, res) => {
  const { 
    trip_type, 
    pu_date, 
    pu_time,
    pu_addr,
    suggested_driver,
    assigned_driver,
    assigned_vehicle,
  } = req.body

  const newTrip = new TripModel({ 
    tripType: trip_type,
    puDate: pu_date,
    puTime: pu_time,
    puAddr: pu_addr,
    suggestedDrivers: suggested_driver,
    assignedDriver: assigned_driver,
    assignedVehicle: assigned_vehicle,
   })

   newTrip.save(function(err) {
     if(err) console.error(err);
    })
    res.send({ message: `A new trip was saved!`});
    res.end()
})

module.exports = router;