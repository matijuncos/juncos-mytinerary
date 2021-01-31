import React, { useState, useEffect } from 'react'
import NoItineraries from './NoItineraries'
import { Link } from 'react-router-dom'
import { FaHome, FaPaperPlane } from "react-icons/fa";
import Itinerary from './Itinerary';
import { connect } from 'react-redux'
import itinerariesActions from '../Redux/actions/itinerariesActions';
//import Loader from './Loader';

const City = (props) => {
    const { cities, itineraries, getItineraries } = props
    const [actualCity, setactualCity] = useState({})
    const id = props.match.params.id

    useEffect(() => {
        const city = cities.filter(city => city._id === id)
        setactualCity(city[0])
        getItineraries(id)
        window.scrollTo(0, 0)
        if (city.length === 0) {
            props.history.push('/cities')
        }

    }, [cities, id, getItineraries, props.history])

    if (itineraries.length === 0) {
        return <NoItineraries city={actualCity} />
    }
    return (
        <>
            <div className="centrar">
                <div className="itineraryBanner" style={{ backgroundImage: `url(${actualCity.cityPicture})` }}>
                    <div className="bannerText">
                        <h2>Welcome to {actualCity.cityName}!</h2>
                        <p>Feel free to check our itineraries and activities!</p>
                    </div>
                </div>

                <div className="insideEachCitie" >
                    {itineraries.map(itinerary => <Itinerary itinerary={itinerary} key={itinerary._id} />)}
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
        itineraries: state.itinerariesR.itineraries,
    }
}
const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries,

}

export default connect(mapStateToProps, mapDispatchToProps)(City)
