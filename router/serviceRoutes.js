const express = require('express')
const serviceController = require('../controller/serviceControllers')

const router = express.Router()

router.post('/create', serviceController.createServiceController)
router.put('/:id', serviceController.updateServiceController)

module.exports = router
