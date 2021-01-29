const Itinerary = require('../models/Itinerary')

const itinerariesController = {
  addItinerarie: (req, res) =>{
    const{cityId, 
      itineraryTitle, 
      userName, 
      userPic, 
      likes, 
      duration, 
      price, 
      hastags, 
      comments, 
      activities} = req.body
    const newItinerary = new Itinerary({
      cityId, itineraryTitle, userName, userPic, likes, duration, price, hastags, comments, activities
    })
    newItinerary.save()
    .then( async newItinerary =>{
      const populatedItinerary = await newItinerary.populate('cityId').execPopulate()
      res.json({success: true, response: populatedItinerary})
    })
    .catch(error =>{console.log(error), error})
  },
   getItinearies: (req, res) =>{
      Itinerary.find().populate('cityId')
      .then( allItineraries =>{
        return res.json({
          success: true,
          response: allItineraries
        })
      })
      .catch(error => res.json({succes:false, error}))
     
   },
   getItinerariesbyCityId: (req, res) =>{
     const {cityid} = req.params
      Itinerary.find({cityId: cityid}).populate('cityId')
      .then(itineraries => res.json({
        succes: true,
        response: itineraries
      }))
      .catch(error => res.json({succes:false, error}))
   },
   updateItinerary: (req, res) =>{
    const id = req.params._id
    Itinerary.findByIdAndUpdate(id, req.body)
    .then( updatedItinerary =>{
      return res.json({
        succes: true,
        results: updatedItinerary
      })
    })
    .catch(error =>{
      return res.json({
        success: false,
        error
      })
    })
   }

}

module.exports = itinerariesController