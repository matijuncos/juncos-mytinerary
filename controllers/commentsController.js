const Itinerary = require('../models/Itinerary')

const commentsController = {
  addComments: (req, res) =>{
    const iTid = req.body.id
    Itinerary.findOneAndUpdate({_id: iTid}, 
      {$push: {comments: {userName: req.user.firstName + " " + req.user.lastName, content:req.body.comment}}},
      {new: true}
      )
      .then(comment=> {
        return res.json({
          success: true,
          response: comment
        })
      })
      .catch(err => console.log(err))

  },
  removeComments: (req, res) =>{
    //similar con método pull para sacar del array
    const coId = req.body.id
    Itinerary.findOneAndUpdate({_id: coId}, 
      {$pull: {comment: {_id}}}//ver que va acá }}},


    )},

}

module.exports = commentsController