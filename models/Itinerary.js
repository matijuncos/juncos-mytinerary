const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  cityId: {type: mongoose.Schema.Types.ObjectId, ref:'city', required: true},
  itineraryTitle: {type: String, required: true},
  userName: {type: String, required: true},
  userPic:{type: String, required: true},
  likes: {type: Number, default: 0},
  duration:{type: Number, required: true},
  price:{type: Number, required: true},
  hastags:{type: Array, required: true},
  comments:[{userName: String, content: String}],
  activities:[{actName: String, actImg: String}]
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary