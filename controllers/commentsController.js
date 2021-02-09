const Itinerary = require('../models/Itinerary')

const commentsController = {
  addComments: (req, res) =>{
    const user = req.user._id
    const iTid = req.body.id

    Itinerary.findOneAndUpdate({_id: iTid}, 
      {$push: {comments: {userName: req.user.firstName + " " + req.user.lastName, content:req.body.comment, email: req.user.email}}},
      {new: true}
        )
      .then( newComment=> res.json({
          success: true,
          response: newComment
        })
      )
      .catch(err => console.log(err))

  },
  removeComment: (req, res) =>{
    const commentId = req.body.commentId
    const IdItinerary = req.body.IdItinerary

    Itinerary.findOneAndUpdate({_id: IdItinerary}, 
       {$pull: {comments: {_id: commentId}}},//ver bien que va acá
       {new: true}
    )
    .then( newComment => res.json({
      success: true, 
      response: newComment
    }))
    .catch(error => res.json({
      success: false,
      response: error 
    }))
  },
  updateComment:(req, res) =>{
    const commentId = req.body.commentId
    const IdItinerary = req.body.IdItinerary
    const token = req.body.token
    const user = req.user

    Itinerary.findOneAndUpdate({_id: IdItinerary, 'comments._id': commentId}, 
      {$set: {'comments.$.content': req.body.updatedComment}},//ver bien como va acá y si es el metod set
      {new: true}
    )
    .then( newComment => res.json({
      success: true,
      response: newComment
    }))
    .catch(error => res.json({
      success: false,
      response: error 
    }))
  }
}

module.exports = commentsController