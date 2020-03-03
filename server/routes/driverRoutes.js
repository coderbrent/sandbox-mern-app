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
    street,
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
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      image: image,
    });


    DriverModel.findOne({ email: newDriver.email }, function(err, driver) {
      if(err) throw err
      if(!driver) {
        newDriver.save(function(err) {
          if(err) throw err
          res.send({ message: 'a new driver was added'})
        })
        } else {
          res.send({ errType: 'DUP_EMAIL', message: `A driver with the e-mail address ${newDriver.email} already exists`})
        } 
      })
  })
  

router.get(`/all-drivers`, (req, res) => {
  DriverModel.find({}, (err, response) => {
    if(err) console.log(err);
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