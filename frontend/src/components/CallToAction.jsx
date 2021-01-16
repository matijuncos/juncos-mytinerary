import React from 'react'
import { Link } from "react-router-dom";

function CallToAction() {
    return (
        <div className="callToAction">
            <h2>Let your adventure begin!</h2>
            <Link to="./cities">
                <button className="ghostBtn">Click Here!</button>        
            </Link>
        </div>
    )
}

export default CallToAction

