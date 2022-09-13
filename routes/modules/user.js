const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email: email })
    .then(user => {
      if (user.password === password) {
        res.render('success', { logout: 1,  firstName: user.first_name})
      } else {
        let alert = 'Password is failed'
        res.render('login', { alert })
      }
    })
    .catch(error => {
      res.status(500)
      res.render('error', { error })
    })
})

router.get('/logout', (req, res) => {
  res.redirect('/user/login')
})

module.exports = router
