const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')
const citiesController = require('../controllers/citiesController')
const itinerariesController = require('../controllers/itinerariesController')
const userController = require('../controllers/userController')
const validator = require('../controllers/validator')

router.route('/cities')
.get(citiesController.getCities)
.post(citiesController.addCity)

 router.route('/city/:_id')
.get(citiesController.getOneCity)
 
router.route('/itineraries')
.get(itinerariesController.getItinearies)
.post(passport.authenticate('jwt', {session:false}), itinerariesController.addItinerarie)
//la ruta protegida recibe al autor en req.body

router.route('/itinerary/:itId')
.put(itinerariesController.updateItinerary)

 router.route('/itineraries/:cityid')
.get(itinerariesController.getItinerariesbyCityId)

router.route('/user/signup')
.post(validator.joiValidate, userController.signUp)

router.route('/user/signin')
.post(userController.signIn)

router.route('/user/storage')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)

module.exports = router