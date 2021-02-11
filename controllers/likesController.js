const Itinerary = require('../models/Itinerary')

const likesController = {
  likeItinerary: (req, res) =>{
    const itinerayId = req.body.itinerayId
    const userId = req.user._id
    Itinerary.findByIdAndUpdate(itinerayId,
    {$addToSet: {likes:userId}},
    {new: true}
    )
    .then( userid =>{
      return res.json({
        success: true,
        response: userid
      })
    })
    .catch(err => {
      return res.json({
        success: false,
        err
      })
    })
  },
  dislikeItinerary: (req, res) =>{
    console.log('like')
    const itinerayId = req.body.itinerayId
    const userId = req.user._id
    Itinerary.findByIdAndUpdate(itinerayId,
    {$pull: {likes:userId}},
    {new: true}
    )
    .then( userid =>{
      return res.json({
        success: true,
        response: userid
      })
    })
    .catch(err => {
      return res.json({
        success: false,
        err
      })
    })
  }
  
}

module.exports = likesController