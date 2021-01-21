const express = require('express')
const router = express.Router()

const citiesController = require('../controllers/citiesController')

router.route('/cities')
.get(citiesController.getCities)
.post(citiesController.addCity)

 router.route('/itineraries/:_id')
.get(citiesController.getOneCity)
 

module.exports = router