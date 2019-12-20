const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if(!token) {
    console.log('no session found...')
    return res.status(401).json({ message: 'no session found - authorization denied.' })
  }

  try {
    const decoded = jwt.verify(token, 'its a secret');
    req.user = decoded
    next();
  } catch (error) {
    res.status(400).json({ message: 'Bad token' })
  }

}

module.exports = auth;