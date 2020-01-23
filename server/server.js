require('dotenv').config();
const express = require('express')
const port = 5000 || process.env.PORT
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const User = require('../server/models/User')
const bodyParser = require('body-parser')
const userRoutes = require('../server/routes/userRoutes')
// const validation = require('../server/validation/login')
const jwt = require('jsonwebtoken')
// const auth = require('./middleware/auth')
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY
})

app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/users', userRoutes, require('./routes/userRoutes'));

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


app.get('/getinfo/:id', (req, res) => {
  const placeID = req.params.id

})

app.post('/searchbyaddress/', (req, res) => {
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const myUser = await User.findOne({ username: username}).exec();
      
    if(!myUser || username === '' || password === '') {
        return res.status(400).json({ message: 'That username does not exist...' })
    }
    
    myUser.comparePassword(password, (error, match) => { 
      if(!match) {
        return res.status(400).json({ message: 'bad password' });
      }
    })
    
    jwt.sign({ id: myUser.id }, 'its a secret', { expiresIn: '1hr' }, 
      (err, token) => {
        if(err) throw err;
          res.send(
            { 
              token,
              user: {
                id: myUser.id,
                name: myUser.name,
                email: myUser.email
              }
            }
          )
      }
    )
  } 
  
  catch(error) {
      return res.status(500).json(error)
  }
})

app.post('/signup', async (req, res) => {
  try {
    const newUser = new User(req.body)
    const result = await newUser.save()
    console.log(result)
    res.send(result)
  }
  catch(error) {
    res.status(500).send(error)
  }
})

app.post('/addusers', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.listen(port, () => console.log(`now listening on port: ${port}`))