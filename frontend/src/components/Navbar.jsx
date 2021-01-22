import React, {useState} from 'react'
import user from '../assets/user.svg'
import { NavLink } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { FaHome, FaPaperPlane } from "react-icons/fa";

function Navbar() {
    const [nav, setNav] = useState(true);
    const openNav = () =>{
        setNav(!nav)
    }
    return (
        <nav>
            <FiMenu className="burger" onClick={openNav}/>
            <div className={nav ? 'links' : 'links activeNav'}>
                <img src={user} alt="" />
                <div>
                    <NavLink to="/" className="navLinks " exact={true}>
                        <p><FaHome className="icons"/> Home</p>
                    </NavLink>
                    <NavLink to="/cities" className="navLinks">
                        <p><FaPaperPlane className="icons"/> Cities</p>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
