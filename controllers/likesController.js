const Itinerary = require('../models/Itinerary')

const likesController = {
  likeItinerary: (req, res) =>{
    console.log('like')
    const itinerayId = req.body.itinerayId
    const userId = req.user._id
    console.log(itinerayId)
    console.log(userId)
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
  }
  
}

module.exports = likesController