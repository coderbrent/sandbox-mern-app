require('dotenv').config()
const express = require('express');
const router = express.Router();
const key = process.env.GOOGLE_API_KEY
const vehicles = require('../mockdb-data/vehicle.json')
const trips = require('../mockdb-data/trips.json')
const axios = require('axios')
const bodyParser = require('body-parser')
const moment = require('moment')
const polyline = require('@mapbox/polyline')
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
})

googleMapsClient

const parseURL = string => string.replace(/\s/g, '+')

const timeConversion = time =>  { 
 return moment(moment(time).toISOString()).unix()
}

const formatTime = timeString => {
  return timeString.replace(/['hour']/g, '').replace(/['mins']/g, '')
} 

router.get('/locate-vehicle', async (req, res) => {
  const pickupTime = timeConversion(trips[0].pickupTime)
  const clientPickupAddr = parseURL(trips[0].pickup)
  const dropOffAddr = parseURL(trips[0].dropoff)

// the following 'helper' function i made simply takes in an array of vehicles and polyline encodes
// their lat/lng so they can be passed properly into a request URL
  const encodeCoords = vehicleList => {
    let encoded = []

    vehicleList.map(car => {
      let encodedNums = 
        polyline.encode([[car.coords.lat, car.coords.lng]])
          .replace(/^/, 'enc:')
          .concat(':|')
      
        encoded.push(encodedNums)
    })
    const formatted = encoded.toString().replace(/[,]/g, '')
    console.log(formatted)
    return formatted;
  }
  
  const urlString = encodeCoords(vehicles)
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${urlString}&destinations=${dropOffAddr}&key=${key}&traffic_model=pessimistic&departure_time=${pickupTime}`

  await axios.get(url).then(response => {
    let closestCars = []
    response.data.rows.map((el, i) => {
    
    const distance = parseInt(el.elements[0].distance.text)
    const traffic = formatTime(el.elements[0].duration_in_traffic.text)

    if(distance > 55) {
      closestCars.push(el)
      }
    })
    res.send(closestCars)
  })
})

router.post('/searchbyaddress/', (req, res) => {
  const { userAddress } = req.body

  googleMapsClient.geocode({
    address: userAddress
  }, (err, response) => {
    if(!err) {
      return res.send(response.json.results[0]);
    } else {
      console.log(err)
    }
  })

})

module.exports = router;