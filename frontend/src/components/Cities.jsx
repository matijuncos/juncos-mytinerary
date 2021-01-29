import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logov9.png'
import { FaHome } from "react-icons/fa";
import Loader from './Loader';
import EachCity from './EachCity';
import citiesActions from '../Redux/actions/citiesActions'
import { connect } from 'react-redux'
import citiesAction from '../Redux/actions/citiesActions';


const Cities = (props) => {
    //const [input, setInput] = useState('')
    useEffect(() => {
        props.getCities()
        window.scrollTo(0, 0)

    }, []);



    const handleCities = (e) => {
        const inputValue = e.target.value
        props.getFilteredCities(inputValue)

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
                props.filteredCities.length === 0 && (
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
                    props.filteredCities.map(city => {
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
        inputValue: state.citiesR.inputValue,
        loading: state.citiesR.loading
    }
}
const mapDispatchToProps = {
    getCities: citiesActions.getCities,
    getFilteredCities: citiesActions.getFilteredCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
