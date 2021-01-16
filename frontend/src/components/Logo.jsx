import React from 'react'
import logo from '../assets/logov9.png'
function Logo() {
    return (
        <div className="slogan">
            <img src={logo} alt="" className="logo"/>
            <h1>Mytinerary!</h1>
            <h2>Find your perfect trip, designed by insiders who knows and love their cities!</h2>
        </div>
    )
}

export default Logo
