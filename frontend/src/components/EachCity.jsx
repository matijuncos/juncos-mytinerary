import React from 'react'
import { Link } from 'react-router-dom'

const EachCity = ({ city }) => {

    const id = city._id
    return (
        <Link to={'/itineraries/' + id} className="cityLink" key={id}>
            <div style={{ backgroundImage: `url(${city.cityPicture})`, height: '35vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} className="eachCity">
                <h3>{city.cityName}</h3>
            </div>
        </Link>
    )
}

export default EachCity
