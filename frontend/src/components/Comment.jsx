import React, { useState } from 'react'
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { connect } from 'react-redux';
import commentsActions from '../Redux/actions/commentsActions';
import itinerariesActions from '../Redux/actions/itinerariesActions';
import { MdSend } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const Comment = (props) => {
  console.log(props)
  const { comment } = props
  const [visible, setVisible] = useState(false)
  const [updatedComment, setUpdatedComment] = useState('')

  const deleteComment = async (e) => {
    const commentId = e.currentTarget.id
    console.log("el id del comment es " + commentId)
    const IdItinerary = props.IdItinerary
    await props.deleteComment(localStorage.getItem('token'), commentId, IdItinerary)
    props.getItineraries(props.id)
  }

  const updateComment = () => {
    setVisible(!visible)
    setUpdatedComment(comment.content)
  }

  const handleInput = (e) => {
    setUpdatedComment(e.target.value)

  }
  const sendUpdate = async (e) => {
    const commentId = e.currentTarget.id
    console.log(commentId)
    const IdItinerary = props.IdItinerary
    await props.updateComment(localStorage.getItem('token'), updatedComment, commentId, IdItinerary)
    props.getItineraries(props.id)
    setVisible(!visible)
  }

  return (
    <>
      <div className="comment">
        {visible ? (
          <>
            <div className="inputDiv update">
              <ImCancelCircle className="cancelBtn" onClick={() => setVisible(!visible)} />
              <input type="text" name="content" placeholder='Write your comment here' className="commentInput update" onChange={handleInput} value={updatedComment} autoFocus />
              <MdSend className="updateIcon" onClick={sendUpdate} id={comment._id} />
            </div>
          </>
        ) : (
            <>
              <div>
                <p className="user">{comment.userName}: </p>
                <p className="content">{comment.content}</p>
              </div>
              <div className="commentIcons">
                <BsPencilSquare onClick={updateComment} className="editComment" />
                <BsTrash onClick={deleteComment} className="editComment trash" id={comment._id} />
              </div>
            </>
          )}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  deleteComment: commentsActions.deleteComment,
  getItineraries: itinerariesActions.getItineraries,
  updateComment: commentsActions.updateComment

}

export default connect(null, mapDispatchToProps)(Comment)
