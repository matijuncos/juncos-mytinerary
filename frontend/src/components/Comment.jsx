import React from 'react'

const Comment = ({ comment }) => {

  return (
    <div className="comment">
      <p className="user">{comment.userName}: </p>
      <p className="content">{comment.content}</p>
    </div>
  )
}

export default Comment
