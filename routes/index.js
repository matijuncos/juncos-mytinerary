const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')
const citiesController = require('../controllers/citiesController')
const commentsController = require('../controllers/commentsController')
const itinerariesController = require('../controllers/itinerariesController')
const userController = require('../controllers/userController')
const validator = require('../controllers/validator')
const likesController = require('../controllers/likesController')



router.route('/cities')
.get(citiesController.getCities)
.post(citiesController.addCity)

 router.route('/city/:_id')
.get(citiesController.getOneCity)
 
router.route('/itineraries')
.get(itinerariesController.getItinearies)
.post(itinerariesController.addItinerarie)

router.route('/comments')
.post(passport.authenticate('jwt', {session:false}), commentsController.addComments)
.put(passport.authenticate('jwt', {session:false}), commentsController.removeComment)

router.route('/commentupdate')
.post(passport.authenticate('jwt', {session:false}), commentsController.updateComment)

// router.route('/like')
// .post(passport.authenticate('jwt', {session:false}), likesController.newLike)

router.route('/itinerary/:itId')
.put(itinerariesController.updateItinerary)

router.route('/itineraries/:cityid')
.get(itinerariesController.getItinerariesbyCityId)

router.route('/user/signup')
.post(validator.joiValidate, userController.signUp) //validator para el signup de JOI

router.route('/user/signin')
.post(userController.signIn)

router.route('/user/storage')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)
//la ruta protegida recibe al usuario en req.body

router.route('/like')
.post(passport.authenticate('jwt', {session:false}), likesController.likeItinerary)

router.route('/dislike')
.post(passport.authenticate('jwt', {session:false}), likesController.dislikeItinerary)


module.exports = router