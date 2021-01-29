import React, { useState, useEffect } from 'react'
import NoItineraries from './NoItineraries'
import { Link } from 'react-router-dom'
import { FaHome, FaPaperPlane } from "react-icons/fa";
import Loader from './Loader';
import Itinerary from './Itinerary';
import { connect } from 'react-redux'
import itinerariesActions from '../Redux/actions/itinerariesActions';

const City = (props) => {
    const [city, setCity] = useState({})
    const id = props.match.params.id
    useEffect(() => {
        const cities = props.cities.filter(city => city._id === id)
        setCity(cities[0])
        props.getItineraries(id)
    }, [])

    if (props.itineraries.length === 0) return <NoItineraries cityName={city.cityName} cityPicture={city.cityPicture} />
    return (
        <>
            <div className="centrar">
                <div className="itineraryBanner" style={{ backgroundImage: `url(${city.cityPicture})` }}>
                    <h2>Welcome to {city.cityName}!</h2>
                </div>

                <div className="insideEachCitie" >
                    {props.itineraries.map(itinerary => {
                        return <Itinerary itinerary={itinerary} />
                    })}
                </div>
                <div className="buttons">
                    <Link to='/cities' className="linksBtn">
                        <button className="backBtn">Go Back to cities!<FaPaperPlane className="btnIcons" /> </button>
                    </Link>
                    <Link to='/' className="linksBtn">
                        <button className="backBtn">Go Back Home!<FaHome className="btnIcons" /></button>
                    </Link>
                </div>
            </div>
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        cities: state.citiesR.cities,
        itineraries: state.itinerariesR.itineraries
    }
}
const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
