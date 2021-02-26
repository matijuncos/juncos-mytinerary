import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Activity from './Activity';
import { FcClock } from "react-icons/fc";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import itinerariesActions from '../Redux/actions/itinerariesActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Itinerary = (props) => {
  const { userName, duration, userPic, itineraryTitle, likes, hastags, comments, price, activities, _id } = props.itinerary
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')
  const [commentObj, setCommentObj] = useState({})
  const [userliked, setUserLiked] = useState('')
  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleComments = (e) => {
    setComment(e.target.value)
    setCommentObj({ userName: props.loggedUser.response.firstName + ' ' + props.loggedUser.response.lastName, content: e.target.value, _id: _id, email: props.loggedUser.response.email })
  }

  useEffect(() => {
    if (props.loggedUser) {
      setUserLiked(props.loggedUser.response.id)
    }
  }, [props.loggedUser])

  const sendComment = () => {
    if (comment.length !== 0 && props.loggedUser) {
      comments.push(comment)
      props.sendComment(comment, props.loggedUser.response.token, _id, commentObj)
      setComment('')
    } else if (comment.length === 0 && props.loggedUser) {
      toast.error("You can't send empty comments")
    } else {
      toast.error('You must be logged in to comment')
    }

  }

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      sendComment()
    }
  }
  const handleLikes = async () => {
    if (!props.loggedUser) {
      toast.error('You must be logged in to like an itinerary')
    } else {
      props.like(props.loggedUser.response.token, _id)
    }
  }

  const handleDislike = async () => {
    props.dislike(props.loggedUser.response.token, _id)
  }
  return (
    <>
      <div className="itinerary">
        <h2>{itineraryTitle}!</h2>
        <div className="userPic" style={{ backgroundImage: `url(${userPic})` }}></div>
        <p className="userName">{userName}</p>
        <div className="itInfo">
          <p className="price"><span className="bold">Price:</span>{[...Array(price)].map((money, idx) => <FaRegMoneyBillAlt className="cash" key={idx} />)}</p>
          <p className="hours"><span className="bold">Duration:</span> {[...Array(duration)].map(clocks => <FcClock className="clock" key={uuidv4()} />)} </p>
          <p className="likes">{likes.includes(userliked) ? <IoIosHeart className="heart" onClick={props.loggedUser && handleDislike} /> : <IoIosHeartEmpty className="heart" onClick={handleLikes} />}<span className="likesSpan" >{likes.length}</span></p>
        </div>
        <div className="hashtags">
          {hastags.map(hashtag => <p className="hashtag" key={hashtag}>#{hashtag}</p>)}
        </div>
        {visible && (
          <>
            <div className="activitiesContainer">
              <h3>Activities</h3>
              <div className="activities">
                {activities.map(activity => <Activity activity={activity} key={activity._id} />)}
              </div>
            </div>
            <div className="commentContainer">
              <h3>Comments</h3>
              <div className="comments">
                {comments.map(comment => <Comment comment={comment} key={comment._id} IdItinerary={_id} id={props.id} />)}
              </div>
              <div className="inputDiv">
                <input type="text" name="content" onKeyDown={enterKey} placeholder={props.loggedUser ? 'Leave your comment here!' : 'You must be logged in to comment'} className="commentInput" onChange={handleComments} value={comment} disabled={!props.loggedUser && true} autoComplete="off" />
                <MdSend className="commentIcon" onClick={sendComment} id={_id} />
              </div>
            </div>
          </>
        )
        }
        <button onClick={handleVisible} className="viewMoreBtn">{visible ? 'View Less' : 'View More'}</button>

      </div>
    </>
  )
}



const mapDispatchToProps = {
  sendComment: itinerariesActions.sendComment,
  like: itinerariesActions.like,
  dislike: itinerariesActions.dislike
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser,
    itineraries: state.itinerariesR.itineraries,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
