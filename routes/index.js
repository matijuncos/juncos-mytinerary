const express = require('express')
const router = express.Router()

const citiesController = require('../controllers/citiesController')
const itinerariesController = require('../controllers/itinerariesController')

router.route('/cities')
.get(citiesController.getCities)
.post(citiesController.addCity)

 router.route('/city/:_id')
.get(citiesController.getOneCity)
 
router.route('/itineraries')
.get(itinerariesController.getItinearies)
.post(itinerariesController.addItinerarie)

router.route('itinerary/:_id')
.put(itinerariesController.updateItinerary)

 router.route('/itineraries/:cityid')
.get(itinerariesController.getItinerariesbyCityId)


module.exports = router