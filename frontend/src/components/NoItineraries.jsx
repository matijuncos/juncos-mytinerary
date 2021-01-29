import React from 'react'

const NoItineraries = ({ cityName, cityPicture }) => {
    return (
        <div className="centrar">
            <div className="oops" style={{ backgroundImage: `url(${cityPicture})` }}>
                <div className="text">
                    <h3>Welcome to {cityName}!</h3>
                    <p>We don't have any itineraries yet, but you can make the first one!</p>
                    <p>Or...go back to see more cities!</p>
                </div>
            </div>

        </div>
    )
}

export default NoItineraries
