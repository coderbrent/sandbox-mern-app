const express = require('express');
const router = express.Router();
const DriverModel = require('../models/Driver');
const multer = require('multer');

router.post(`/add-driver`, async (req, res) => {
  const { 
    first_name, 
    last_name,
    email,
    phone,
    street1,
    street2,
    city,
    state,
    zipcode,
    image,
  } = req.body

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'driver-images')
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  const upload = multer({ storage: storage }).single('file')

  const newDriver = 
    await new DriverModel({ 
      first_name: first_name, 
      last_name: last_name,
      email: email,
      phone: phone,
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zipcode: zipcode,
      image: image,
    });

  newDriver.save(function(err) {
    if(err) return console.log(err);
    console.log('driver was saved!')
  })
  res.json({ newDriver })
  res.end()
})

router.get(`/all-drivers`, (req, res) => {
  DriverModel.find({}, (err, response) => {
    if(err) console.log(err);
    console.log(response)
    res.json(response)
  })
})

router.get(`/get-driver/:id`, (req, res) => {
  
})

router.put(`/update-driver/:id`, (req, res) => {

})

router.delete(`/delete-driver/:id`, (req, res) => {

})

module.exports = router;