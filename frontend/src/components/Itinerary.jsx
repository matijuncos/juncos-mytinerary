import React, { useState } from 'react'
import Comment from './Comment'
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import Activity from './Activity';

const Itinerary = ({ itinerary }) => {
  const { userName, duration, userPic, itineraryTitle, likes, hastags, comments, price, activities } = itinerary
  const [visible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div className="itinerary">
        <h2>{itineraryTitle}!</h2>
        <div className="userPic" style={{ backgroundImage: `url(${userPic})` }}></div>
        <p>{userName}</p>
        <div className="itInfo">
          <p className="price">Price:{Array(price).fill(<FaRegMoneyBillAlt className="cash" />)}</p>
          <p>Duration: {duration} hours</p>
          <p className="likes">{likes === 0 ? <IoIosHeartEmpty className="heart" /> : <IoIosHeart className="heart" />} <span className="likesSpan">{likes}</span></p>
        </div>
        <div className="hashtags">
          {hastags.map(hashtag => {
            return (
              <p key={hashtag} className="hashtag">#{hashtag}</p>
            )
          })}
        </div>
        {visible && (
          <>
            <div className="activities">
              <h3>Activities</h3>
              {activities.map(activity => <Activity activity={activity} key={activity._id} />)}
            </div>

            <div className="comments">
              <h3>Comments</h3>
              {comments.map(comment => <Comment comment={comment} key={comment._id} />)}
              <div className="inputDiv">
                <input type="text" name="content" placeholder='You must be logged in to leave a comment' disabled className="commentInput" />
                <MdSend className="commentIcon" />
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

export default Itinerary
