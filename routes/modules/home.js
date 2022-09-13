const express = require('express')
const router = express.Router()
const checkAuth = require('../../utils/checkAuth')

router.get('/', async (req, res) => {
  const { email, password } = req.session
  const checkAuthResult = await checkAuth(email, password)
  //  如果已建立session 呈現logout button狀態
  if (checkAuthResult) {
    return res.render('success', { logout: 1, firstName: checkAuthResult.first_name })
  }
  res.render('index', { login: 1 })
})

module.exports = router
