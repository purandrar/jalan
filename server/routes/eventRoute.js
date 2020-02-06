const express = require('express')
const router = express.Router()
const eventcontroller = require('../controllers/eventcontroller')
const authorization = require('../middleware/authorization')

router.get('/',eventcontroller.findAll)
router.post('/',eventcontroller.addEvent)
router.get('/:id',eventcontroller.findOne)
router.delete('/:id',authorization,eventcontroller.delete)
module.exports = router