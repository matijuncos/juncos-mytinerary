import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiWorld } from "react-icons/gi";
import Google from '../assets/google.png'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';

const SignIn = (props) => {

  const [logUser, setLogUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const handleInput = (e) => {
    const inputValue = e.target.value
    const property = e.target.name
    setLogUser({
      ...logUser,
      [property]: inputValue
    })
  }

  const handleClick = async () => {
    setErrorMessage('')
    var response = await props.signIn(logUser)
    if (response && !response.success) {
      setErrorMessage(response.response)
    }

  }


  return (
    <div className="centrar forms">
      <div className="form">
        <GiWorld className="worldIcon" />
        <h2>Sign in!</h2>
        {errorMessage}
        <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleInput} />
        <input type="password" name="password" placeholder="Please, enter your password" onChange={handleInput} />
        <button className="logUserBtn" onClick={handleClick}>Sign in!</button>
        <p> Or you can sign in with your Google account</p>
        <div className="google">
          <img src={Google} alt="" className="logoImg" />
          <div className="googleText">
            <p>Log in with Google</p>
          </div>
        </div>
        <p>Don't have an account?  <Link to='/signup' className="logLink">Sign up here!</Link></p>
      </div>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}
const mapDispatchToProps = {
  signIn: userActions.signIn

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
