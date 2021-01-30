import React, { useState, useEffect } from 'react'
import NoItineraries from './NoItineraries'
import { Link } from 'react-router-dom'
import { FaHome, FaPaperPlane } from "react-icons/fa";
import Itinerary from './Itinerary';
import { connect } from 'react-redux'
import itinerariesActions from '../Redux/actions/itinerariesActions';
import Loader from './Loader';

const City = (props) => {
    const [city, setCity] = useState({})
    const id = props.match.params.id
    useEffect(() => {
        const city = props.cities.filter(city => city._id === id)
        setCity(city[0])
        props.getItineraries(id)
        window.scrollTo(0, 0)
        if (city.length === 0) {
            props.history.push('/cities')
        }
    }, [])

    console.log(props.cities)
    if (props.itineraries.length === 0) return <NoItineraries city={city} />
    return (
        <>
            <div className="centrar">
                <div className="itineraryBanner" style={{ backgroundImage: `url(${city.cityPicture})` }}>
                    <div className="bannerText">
                        <h2>Welcome to {city.cityName}!</h2>
                        <p>Feel free to check our itineraries and activities!</p>

                    </div>
                </div>

                <div className="insideEachCitie" >
                    {props.itineraries.map(itinerary => <Itinerary itinerary={itinerary} key={itinerary._id} />)}
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
