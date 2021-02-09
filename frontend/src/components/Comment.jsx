import React, { useState, useEffect } from 'react'
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { connect } from 'react-redux';
import itinerariesActions from '../Redux/actions/itinerariesActions';
import { MdSend } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const Comment = (props) => {
  const { comment } = props
  const [visible, setVisible] = useState(false)
  const [updatedComment, setUpdatedComment] = useState('')
  const [user, setUser] = useState('')

  const deleteComment = async (e) => {
    const commentId = e.currentTarget.id
    const IdItinerary = props.IdItinerary
    await props.deleteComment(props.loggedUser.response.token, commentId, IdItinerary)
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
    const IdItinerary = props.IdItinerary
    await props.updateComment(props.loggedUser.response.token, updatedComment, commentId, IdItinerary)
    setVisible(!visible)
  }
  useEffect(() => {
    if (props.loggedUser) {
      setUser(props.loggedUser.response.email)
    }
  }, [])

  return (
    <>
      <div className="comment">
        {visible ? (
          <>
            <div className="inputDiv update">
              <ImCancelCircle className="cancelBtn" onClick={() => setVisible(!visible)} />
              <input type="text" name="content" placeholder='Write your comment here' className="commentInput update" onChange={handleInput} value={updatedComment} autoFocus autoComplete="off" />
              <MdSend className="updateIcon" onClick={sendUpdate} id={comment._id} />
            </div>
          </>
        ) : (
            <>
              <div className="insideComment">
                <div>
                  <p className="user">{comment.userName}: </p>
                  <p className="content">{comment.content}</p>
                </div>
                <div className="commentIcons">
                  {props.comment.email === user && (
                    <>
                      <BsPencilSquare onClick={updateComment} className="editComment" />
                      <BsTrash onClick={deleteComment} className="editComment trash" id={comment._id} />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
      </div>
    </>
  )
}

const mapDispatchToProps = {
  deleteComment: itinerariesActions.deleteComment,
  updateComment: itinerariesActions.updateComment

}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
