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
import commentsActions from '../Redux/actions/commentsActions'
import { useAlert } from 'react-alert'
import itinerariesActions from '../Redux/actions/itinerariesActions';
import likeActions from '../Redux/actions/likeAction';


const Itinerary = (props) => {
  const alert = useAlert()
  const { userName, duration, userPic, itineraryTitle, likes, hastags, comments, price, activities, _id } = props.itinerary
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')
  const [userliked, setUserLiked] = useState('')
  const handleVisible = () => {
    setVisible(!visible)
  }

  const handleComments = (e) => {
    setComment(e.target.value)
  }

  useEffect(() => {
    if (props.loggedUser) {
      setUserLiked(props.loggedUser.response.id)
    }
  }, [])

  const sendComment = async () => {
    if (comment.length !== 0) {
      await props.sendComment(comment, localStorage.getItem('token'), _id)
      setComment('')
      props.getItineraries(props.id)
    } else {
      alert.error("You can't send empty comments")
    }
  }
  const handleLikes = async () => {
    await props.like(localStorage.getItem('token'), _id)
    props.getItineraries(props.id)
  }

  const handleDislike = async () => {
    await props.dislike(localStorage.getItem('token'), _id)
    props.getItineraries(props.id)
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
          <p className="likes">{likes.includes(userliked) ? <IoIosHeart className="heart" onClick={handleDislike} /> : <IoIosHeartEmpty className="heart" onClick={handleLikes} />}<span className="likesSpan" >{likes.length}</span></p>
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
                <input type="text" name="content" placeholder='You must be logged in to comment' className="commentInput" onChange={handleComments} value={comment} />
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
  getItineraries: itinerariesActions.getItineraries,
  sendComment: commentsActions.sendComment,
  like: likeActions.like,
  dislike: likeActions.dislike
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
