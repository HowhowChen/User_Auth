const User = require('../models/User')

function checkAuth(email, password) {
  return User.findOne({ email, password })
    .lean()
    .then(user => { return user })
}

module.exports = checkAuth
