const express = require('express');
const router = express.Router();
const TripModel = require('../models/Trip')
const geocoder = require('geocoder')
const key = process.env.GOOGLE_API_KEY

router.get(`/get-trips`, (req, res) => {
  TripModel.find({}, (err, docs) => {
    if(err) throw err
    return res.json(docs)
  })
})

router.post(`/add-trip`, async (req, res) => {
  const { 
    trip_type, 
    pu_date, 
    pu_time,
    pu_addr,
    suggested_driver,
    assigned_driver,
    assigned_vehicle,
  } = req.body
  //I think this is kind of a janky solution, but it works - had to scope
  //the db operations into an asynchronous geocoder function in order to
  //store the coords in mongo. Originally when mongo methods were scoped, 
  //outside the geocoding function, saves were occuring synchronously
  //and storing empty values in the coords field.
  geocoder.geocode(pu_addr, async (err, data) => { 
    if(err) console.log(err);

    const coords = []
    coords.push(
      data.results[0].geometry.location.lng, 
      data.results[0].geometry.location.lat
    )

    const newTrip = await new TripModel({ 
      tripType: trip_type,
      puDate: pu_date,
      puTime: pu_time,
      puAddr: { 
        location: {
          type: 'Point', 
          coordinates: coords,
        },
        text_address: pu_addr,
      },
      suggestedDrivers: suggested_driver,
      assignedDriver: assigned_driver,
      assignedVehicle: assigned_vehicle,
     })

     await newTrip.save(function(err) {
      if(err) { 
         console.log(err.message)
       }
     })
     res.send({ message: `A new trip was saved!`});
     res.end()
  }, { key: key })
  
})

router.delete(`/delete-trip/:id`, (req, res) => {
  const tripId = req.params.id
  TripModel.findByIdAndDelete(tripId, (err, res) => {
    if(err) console.log(err)
  })
  res.send({ message: `trip was successfully deleted from the DB!`})
  return res.end()
})

router.put(`/assign-driver/:tripid/:driverid`, async (req, res) => {
  const driverId = req.params.driverid
  const tripId = req.params.tripid

  await TripModel
    .findByIdAndUpdate(
      tripId, 
        { 
          assignedDriver: driverId 
        }, 
        { 
          new: true,
          upsert: false, 
          useFindAndModify: false, 
          omitUndefined: false
        }, (err, response) => {
          if(err) console.log(err)
          res.send({ message: response })
        })
})

router.put(`/remove-driver/:tripid`, async (req, res) => {
  const tripId = req.params.tripid

  await TripModel
    .findByIdAndUpdate(
      tripId,
      {
        assignedDriver: ''
      },
      {
        new: true,
        upsert: false,
        useFindAndModify: false,
        omitUndefined: false
      }, (err, response) => {
        if(err) console.log(err)
        res.send({ message: response })
      }
    )
})

module.exports = router;