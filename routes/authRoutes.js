const express = require('express')
const router = express.Router()

const { register, login, logout } = require('../controllers/authController.js')

//! register(sign in) and login are post and logout is get
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)


module.exports = router 