import React from 'react'
import { Link } from "react-router-dom";
import {FaPaperPlane } from "react-icons/fa";

function CallToAction() {
    return (
        <div className="callToAction">
            <h2>Let your adventure begin!</h2>
            <Link to="./cities">
                <button className="ghostBtn">Click Here! <FaPaperPlane className="icons"/></button>        
            </Link>
        </div>
    )
}

export default CallToAction

