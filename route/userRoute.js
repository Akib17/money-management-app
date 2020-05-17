const router = require('express').Router()
const { login, registration, allUsers } = require('../controller/userController')

// @route: /api/users/login
// Desc: Login Route
router.post('/login', login)

// @route: /api/users/registration
// Desc: Registration Route
router.post('/registration', registration)

// @Route: /api/users
router.get('/', allUsers)

module.exports = router