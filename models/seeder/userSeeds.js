const User = require('../User')
const db = require('../../config/mongoose')
const users = require('./user.json')

db.once('open', () => {
  User.create(users.users)
    .then(() => {
      console.log('User Seeds Saved')
      db.close()
    })
    .catch(error => console.log(error))
})
