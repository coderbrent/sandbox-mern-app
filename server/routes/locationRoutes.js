require('dotenv').config()
const express = require('express');
const router = express.Router();
const key = process.env.GOOGLE_API_KEY
const vehicles = require('../mockdb-data/vehicle.json')
const trips = require('../mockdb-data/trips.json')
const axios = require('axios')
const moment = require('moment')
const polyline = require('@mapbox/polyline')
const Trips = require('../models/Trip')

let newVehicleList = []

const parseURL = string => string.replace(/\s/g, '+')

const timeConversion = time =>  { 
 return moment(moment(time).toISOString()).unix()
}

async function getTrips() {
  try {
    const trips = await Trips.find({}, (err, res) => {
      if(err) throw err
      return res;
    })
  } catch (error) {
    console.error(error)
  }
}

const encodeCoords = vehicleList => {
  let encodedUrl = []
  
  vehicleList.map(car => {
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
    console.log(response)
    response.data.rows.map((el, i) => {
      const distance = parseInt(el.elements[0].distance.text)
      const trafficDuration = el.elements[0].duration_in_traffic.text
      vehicles[i].distanceAwayInMinutes = distance
    })
    res.json({ vehicles })
  })

})

// router.post('/searchbyaddress/', (req, res) => {
//   const { userAddress } = req.body

//   googleMapsClient.geocode({
//     address: userAddress
//   }, (err, response) => {
//     if(!err) {
//       return res.send(response.json.results[0]);
//     } else {
//       console.log(err)
//     }
//   })

// })

module.exports = router;