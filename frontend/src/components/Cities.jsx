import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logov9.png'
import { FaHome } from "react-icons/fa";
import Loader from './Loader';
import EachCity from './EachCity';
import citiesActions from '../Redux/actions/citiesActions'
import { connect } from 'react-redux'

const Cities = (props) => {
    const { getCities, getFilteredCities, filteredCities } = props

    useEffect(() => {
        getCities()
        window.scrollTo(0, 0)
    }, [getCities]);

    const handleCities = (e) => {
        const inputValue = e.target.value
        getFilteredCities(inputValue)
    }

    if (props.cities.length === 0) {
        return <Loader />
    }
    return (
        <div className="bigContainer">
            <img src={logo} alt="" />
            <h2>Take a look at these cities!</h2>
            <input type="text" placeholder="Search here!" className="citiesInput" onChange={handleCities} />
            {
                filteredCities.length === 0 && (
                    <>
                        <div className="oops failedSearch">
                            <div className="text">
                                <h3>Oops!</h3>
                                <p>We don't have any city that matches your search!</p>
                                <p>Try another one!</p>
                            </div>
                        </div>
                    </>
                )
            }
            <div className="citiesContainer">
                {
                    filteredCities.map(city => {
                        return (
                            <EachCity city={city} key={city._id} />
                        )
                    })
                }
            </div>
            <Link to='/' className="linksBtn">
                <button className="backBtn">Go Back Home!<FaHome className="btnIcons" /></button>
            </Link>
        </div>
    )


}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesR.cities,
        filteredCities: state.citiesR.filteredCities,
    }
}
const mapDispatchToProps = {
    getCities: citiesActions.getCities,
    getFilteredCities: citiesActions.getFilteredCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
