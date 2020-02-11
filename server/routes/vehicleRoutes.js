const express = require('express');
const router = express.Router();
const VehicleModel = require('../models/Vehicle')

router.post(`/add-vehicle`, (req, res) => {
  const { 
    make, 
    model, 
    year, 
    color, 
    plate, 
    photo, 
    currentDriver, 
    lat, 
    lng } = req.body

  const newVehicle = new VehicleModel({
    make: make,
    model: model,
    year: year,
    color: color,
    plate: plate,
    photo: photo,
    currentDriver: currentDriver,
    location: {
      coords: {
        lat: lat,
        lng: lng
      }
    }
   })

   newVehicle.save(function(err) {
     if(err) console.log(err)
   })
   res.json({ message: 'a new vehicle was added to the db'})
   res.end();
})

module.exports = router;