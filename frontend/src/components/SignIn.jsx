import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logov9.png'


const SignIn = (props) => {

  const [logUser, setLogUser] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [hidden, setHidden] = useState(true)
  const handleInput = (e) => {
    const inputValue = e.target.value
    const property = e.target.name
    setLogUser({
      ...logUser,
      [property]: inputValue
    })
  }

  const singIn = async () => {
    setErrorMessage('')
    if (logUser.email === '' || logUser.password === '') {
      setErrorMessage('No fields should be empty')
      return false
    }
    var response = await props.signIn(logUser)
    if (response && !response.success) {
      setErrorMessage(response.data.response)
    } else {
      props.history.push('/')
    }
  }

  const responseGoogle = async (response) => {
    console.log(response)

    if (response.error) {
      toast.error('Try Again, please')

    } else {
      const res = await props.signIn({
        email: response.profileObj.email,
        password: `a${response.profileObj.googleId}`
      })
      if (res) {
        setErrorMessage('You need to sign up first!')
      }
    }
  }

  const enterKey = (e) => {
    if (e.key === 'Enter') {
      singIn()
    }
  }

  return (
    <div className="centrar forms">
      <div className="form">
        <img src={logo} alt="" />
        <h2>Sign in!</h2>
        <p className="error">{errorMessage}</p>
        <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleInput} />
        <div className="passWordDiv">
          <FaEye className="eye" onClick={() => setHidden(!hidden)} />
          <input type={hidden ? 'password' : 'text'} name="password" placeholder="Please, enter your password" onChange={handleInput} onKeyDown={enterKey} />
        </div>
        <button className="logUserBtn" onClick={singIn}>Sign in!</button>
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
