import React, { useState } from 'react'
import Comment from './Comment'
import { IoCash } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import Activity from './Activity';
import Loader from './Loader';

const Itinerary = ({ itinerary }) => {
  const { userName, duration, userPic, itineraryTitle, likes, hastags, comments, price, activities } = itinerary
  const [visible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(!visible)
  }
  if (!userName) return <Loader />
  return (
    <>
      <div className="itinerary">
        <h2>{itineraryTitle}!</h2>
        <div className="userPic" style={{ backgroundImage: `url(${userPic})` }}></div>
        <p>{userName}</p>
        <div className="itInfo">
          <p className="price">Price:{Array(price).fill(<IoCash className="cash" />)}</p>
          <p>Duration: {duration} hours</p>
          <p className="likes">Likes:<IoIosHeartEmpty className="heart" /> <span className="likesSpan">{likes}</span></p>
        </div>
        <div className="hashtags">
          {hastags.map(hashtag => <p className="hashtag">#{hashtag}</p>)}
        </div>
        <button onClick={handleVisible} className="viewMoreBtn">{visible ? 'View Less' : 'View More'}</button>
        {visible && (
          <>
            <div className="activities">
              <h3>Activities</h3>
              <div className="activity">
                {activities.map(activity => <Activity activity={activity} />)}
              </div>
            </div>
            <div className="comments">
              <h3>Comments</h3>
              {comments.map(comment => <Comment comment={comment} />)}
              <div className="inputDiv">
                <input type="text" placeholder='You must be logged to leave a comment' disabled className="commentInput" />
                <MdSend className="commentIcon" />
              </div>
            </div>
          </>
        )
        }
      </div>
    </>
  )
}

export default Itinerary
