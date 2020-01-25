require('dotenv').config()
const express = require('express');
const router = express.Router();
const key = process.env.GOOGLE_API_KEY
const vehicles = require('../mockdb-data/vehicle.json')
const trips = require('../mockdb-data/trips.json')
const axios = require('axios')
const moment = require('moment')
const polyline = require('@mapbox/polyline')
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
})

let newVehicleList = []

const parseURL = string => string.replace(/\s/g, '+')

const timeConversion = time =>  { 
 return moment(moment(time).toISOString()).unix()
}

const encodeCoords = vehicleList => {
  let encodedUrl = []
  
  vehicleList.map((car, i) => {
    let encodedNums = 
      polyline.encode([[car.coords.lat, car.coords.lng]])
      .replace(/^/, 'enc:')
      .concat(':|')
      
      encodedUrl.push(encodedNums)
      newVehicleList.push(`${car.vehicleID}: ${encodedNums}`)
  })
  const formattedUrl = encodedUrl.toString().replace(/[,]/g, '')
  return formattedUrl;
}

router.get('/locate-vehicle', async (req, res) => {
  const pickupTime = timeConversion(trips[0].pickupTime)
  const clientPickupAddr = parseURL(trips[0].pickup.street + trips[0].pickup.city + trips[0].pickup.state)
  const dropOffAddr = parseURL(trips[0].dropoff)
  const urlString = encodeCoords(vehicles)
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${urlString}&destinations=${dropOffAddr}&key=${key}&traffic_model=pessimistic&departure_time=${pickupTime}`

  await axios.get(url).then(response => {
    response.data.rows.map((el, i) => {
    const distance = parseInt(el.elements[0].distance.text)
    const trafficDuration = el.elements[0].duration_in_traffic.text
    vehicles[i].distanceAwayInMinutes = distance
    })
    res.json({ vehicles })
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