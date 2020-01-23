const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validate = require('../../server/validation/login');
const auth = require('../middleware/auth')
const UserModel = require('../models/User')

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username}).exec();
    if(!user) {
      return res.status(400).send({ message: 'That username does not exist...' })
    } 
      user.comparePassword(password, (error, match) => {
        if(!match) {
          return res.status(400).send({ message: 'bad password' });
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
    res.send({ message: 'Successfully logged in!' })
  } catch(error) {
      res.status(500).send(error)
  }
})

router.get('/user', auth, (req, res) => {
  UserModel.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;