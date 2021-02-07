import React, { useState } from 'react'
import user from '../assets/user.svg'
import { NavLink, Link } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { FaHome, FaPaperPlane } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";
import { connect } from 'react-redux';
import userActions from '../Redux/actions/userActions';
import { useAlert } from 'react-alert'



function Navbar(props) {
    const alert = useAlert()
    const { loggedUser } = props
    const [nav, setNav] = useState(true);
    const [userlinks, setUserLinks] = useState(true)
    const openNav = () => {
        setNav(!nav)
    }

    const signOut = () => {
        alert.show('Hope to see you soon!')
        props.signOut()
        localStorage.clear()

    }
    return (
        <nav>
            <FiMenu className="burger" onClick={openNav} />
            <div className={nav ? 'links' : 'links activeNav'}>
                <div onClick={() => setUserLinks(!userlinks)} className="userLinksContainer">
                    <div className="userPicture" style={{ backgroundImage: `url(${loggedUser ? loggedUser.response.userPicture : user})` }}></div>
                    <div className={userlinks ? 'userLinks' : 'userLinks visible'}>
                        {!loggedUser ? (
                            <>
                                <Link to='/signin' className="signInLinks">Sign In</Link>
                                <Link to='/signup' className="signInLinks">Sign Up</Link>
                            </>
                        ) : (
                                <Link to='/' className="signInLinks" onClick={signOut}>Sign Out</Link>
                            )
                        }
                    </div>
                    <BiCaretDown className="dropDown" />
                    {loggedUser && 'Hi there, ' + loggedUser.response.firstName + '!'}
                </div>
                <div>
                    <NavLink to="/" className="navLinks " exact={true}>
                        <p><FaHome className="icons" /> Home</p>
                    </NavLink>
                    <NavLink to="/cities" className="navLinks">
                        <p><FaPaperPlane className="icons" /> Cities</p>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userR.loggedUser
    }
}
const mapDispatchToProps = {
    signOut: userActions.signOut
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
