import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiWorld } from "react-icons/gi";
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';
import { useAlert } from 'react-alert'

const SignIn = (props) => {
  const alert = useAlert();

  const [logUser, setLogUser] = useState({
    email: '',
    password: ''
  })
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
    if (logUser.email === '' || logUser.password === '') {
      setErrorMessage('No fields should be empty')
      return false
    }
    var response = await props.signIn(logUser)
    if (response && !response.success) {
      setErrorMessage(response.response)

    } else {
      alert.success('welcome')
      props.history.push('/')
    }
  }

  const responseGoogle = async (response) => {
    if (response.error) {
      alert.error('Try Again, please')
    } else {
      await props.signIn({
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      })

      //alert.success('Welcome dear user!')
    }
  }

  return (
    <div className="centrar forms">
      <div className="form">
        <GiWorld className="worldIcon" />
        <h2>Sign in!</h2>
        <p className="error">{errorMessage}</p>
        <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleInput} />
        <input type="password" name="password" placeholder="Please, enter your password" onChange={handleInput} />
        <button className="logUserBtn" onClick={handleClick}>Sign in!</button>
        <p> Or you can sign in with your Google account</p>
        <div className="googleBtn">
          <GoogleLogin
            clientId="64572824100-laueolo93op2un8m3ajq5g9t8dkriduv.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
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
