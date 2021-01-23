import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logov9.png'
import { FaHome } from "react-icons/fa";
import Loader from './Loader';
import EachCity from './EachCity';


const Cities = () => {
    const [input, setInput] = useState('')
    const [cities, setcities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([])   
    const [loading, setLoading]  = useState(true)

    useEffect(() => {
        fetch('http://localhost:4000/api/cities')
        .then(res => res.json())    
        .then(data => {setcities(data.results) 
            setFilteredCities(data.results)
            setLoading(false)
        })
        .catch(error => {console.log(error)})
        window.scrollTo(0, 0)    
    }, []);
    
    const handleCities = (e) =>{
        const value = e.target.value
        setInput(value)
    }
    
    useEffect(()=>{
        const filteredData = cities.filter(city => city.cityName.toLowerCase().indexOf(input.toLowerCase().trim()) === 0 )
       setFilteredCities(filteredData)
    }, [input, cities])
    
    if(loading)return <Loader/>
                
        return (
                    <div className="bigContainer">
                            <img src={logo} alt=""/>
                            <h2>Take a look at these cities!</h2>
                            <input type="text" placeholder="Search here!" className="citiesInput" onChange={handleCities}/>
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
                            filteredCities.map(city=>{
                                return (
                                        <EachCity city={city} key={city._id}/>
                                    )
                                })
                        }
                        </div>
                        <Link to='/' className="linksBtn">
                            <button className="backBtn">Go Back Home!<FaHome className="btnIcons"/></button>
                        </Link>
                    </div>
                )
            
    
}

export default Cities
