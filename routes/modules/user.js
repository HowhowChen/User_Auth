const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const checkAuth = require('../../utils/checkAuth')

router.get('/login', async (req, res) => {
  const { email, password } = req.session
  const checkAuthResult = await checkAuth(email, password)
  //  如果已建立session
  if (checkAuthResult) {
    return res.render('success', { logout: 1, firstName: checkAuthResult.first_name })
  }
  res.render('login')
})

// login form router
router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password })
    .then(user => {
      if (user.email === req.session.email && user.password === req.session.pasword) {
        res.render('success', { logout: 1,  firstName: user.first_name})
      } else {
        [req.session.email, req.session.password] = [email, password]
        res.render('success', { logout: 1,  firstName: user.first_name})
      }
    })
    .catch(error => {
      res.status(500)
      res.render('error', { error })
    })
})

// logout button router
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
