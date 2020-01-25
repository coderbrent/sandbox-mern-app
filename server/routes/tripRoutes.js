const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const trips = require('../mockdb-data/trips.json')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get(`/trips`, (req, res) => {
  res.json({ trips })
  return res.end()
})

router.post(`/newtrip`, (req, res) => {
  console.log(req.body)
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

module.exports = router;