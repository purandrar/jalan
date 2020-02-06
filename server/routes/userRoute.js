const express = require('express')
const router = express.Router()
const userController = require('../controllers/usercontroller')

router.post('/',userController.register)
router.post('/',userController.login)

module.exports = router