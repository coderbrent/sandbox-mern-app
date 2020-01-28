const express = require('express');
const router = express.Router();
const DriverModel = require('../models/Driver')

router.post(`/new-driver`, async (req, res) => {
  const { 
    first, 
    last,
    email,
    phone,
    street1,
    street2,
    city,
    state,
    zipcode,
    img,
  } = req.body

  const newDriver = 
    await new DriverModel({ 
      first_name: first, 
      last_name: last,
      email: email,
      phone: phone,
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zipcode: zipcode,
      image: img
    });

  newDriver.save(function(err) {
    if(err) return handleError(err);
    console.log('driver was saved!')
  })
  res.json({ newDriver })
  res.end()
})

router.get(`/get-driver/:id`, (req, res) => {

})

router.put(`/update-driver/:id`, (req, res) => {

})

router.delete(`/delete-driver/:id`, (req, res) => {

})

module.exports = router;