import React, {useState, useEffect} from 'react'
import NoItineraries from './NoItineraries'
import {Link} from 'react-router-dom'
import { FaHome, FaPaperPlane } from "react-icons/fa";
import Loader from './Loader';

const City = (props) => {
    const [city, setCity] = useState({})
    const [loading, setLoading] = useState(true)
    const id = props.match.params.id
    
    useEffect(()=>{
        fetch(`http://localhost:4000/api/itineraries/${id}`)
        .then(res => res.json())
        .then(data => {
            setCity(data.results)
            setLoading(false)
            
        })
        .catch(error => {
            window.location.pathname = '/cities'
            console.log(error)
        })
        window.scrollTo(0, 0)    
    },[id])

    if(loading) return <Loader/>
        return (
                <div className="centrar">
                    <div className="insideEachCity" >
                        <NoItineraries cityName={city.cityName} cityPicture={city.cityPicture}/>
                        <div className="buttons">
                            <Link to='/cities' className="linksBtn">
                                <button className="backBtn">Go Back to cities!<FaPaperPlane className="btnIcons"/> </button>
                            </Link>
                            <Link to='/' className="linksBtn">
                                <button className="backBtn">Go Back Home!<FaHome className="btnIcons"/></button>
                            </Link>
                        </div>
                    </div> 
                </div>
        )
    
}

export default City
