const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.pre('save', function(next) {
  console.log('user input was validated on the server...')
  
  if(!this.isModified('password')) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 10);
  next();
})

UserSchema.methods.comparePassword = function(plaintext, cb) {
  return cb(null, Bcrypt.compareSync(plaintext, this.password))
}

module.exports = User = mongoose.model('User', UserSchema)