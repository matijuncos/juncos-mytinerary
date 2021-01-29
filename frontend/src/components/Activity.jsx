import React from 'react'

const Activity = ({ activity }) => {
  return (
    <div className="activityImg" style={{ backgroundImage: `url(${activity.actImg})`, backgroundSize: 'cover' }}>
      <p>{activity.actName}</p>
    </div>


  )
}

export default Activity
