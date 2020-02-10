require('dotenv').config();
const express = require('express')
const port = 5000 || process.env.PORT
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('../server/routes/userRoutes')
const locationRoutes = require('../server/routes/locationRoutes')
const tripRoutes = require('../server/routes/tripRoutes')
const driverRoutes = require('../server/routes/driverRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoutes);
app.use('/locations', locationRoutes)
app.use('/trips', tripRoutes)
app.use('/drivers', driverRoutes)

const db = mongoose.connection

mongoose.connect
  ('mongodb://localhost:27017/reservation', 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
  .then(() => console.log('Mongo is connected and working...'))
  .catch(err => console.log(err));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('DB is connected') })

app.listen(port, () => console.log(`now listening on port: ${port}`))


