const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
})

module.exports = router
