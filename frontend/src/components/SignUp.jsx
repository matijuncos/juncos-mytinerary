import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import logo from '../assets/logov9.png'
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {
  const { signUp } = props

  const [hidden, setHidden] = useState(true)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userPicture: '',
    country: ''
  })
  const [countryList, setCountryList] = useState([])
  const [errors, setErrors] = useState({})

  const failedInputs = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    userPicture: null,
    country: null
  }



  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountryList(res.data))
  }, [])

  const handleForm = (e) => {
    const property = e.target.name
    const inputValue = e.target.value
    setNewUser({
      ...newUser,
      [property]: inputValue
    })
  }

  const handleClick = async () => {

    const res = await signUp(newUser)
    if (res && !res.success) {
      console.log(res)
      // res.errors.map(error => {
      //   failedInputs[error.label] = error.message
      //   return false

      //      })
      setErrors(failedInputs)
    }
  }

  const responseGoogle = async (response) => {
    if (response.error) {
      toast.error('Try Again, please')
    } else {
      const res = await signUp({
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        password: `a${response.profileObj.googleId}`,
        userPicture: response.profileObj.imageUrl,
        country: 'Argentina',
      })
      if (res && !res.success) {
        toast.error("There's already an account with that mail :)")
        return false
      }

    }
  }
  return (
    <div className="centrar forms">

      <div className="form">
        <img src={logo} alt="" />        <h2>Sign up!</h2>
        <div className="signupInput">
          <small className="small">{errors.firstName && errors.firstName}</small>
          <input type="text" name="firstName" placeholder="Please, enter your first name" onChange={handleForm} autoComplete="off" />
        </div>
        <div className="signupInput">
          <small className="small">{errors.lastName && errors.lastName}</small>
          <input type="text" name="lastName" placeholder="Please, enter your last name" onChange={handleForm} autoComplete="off" />
        </div>
        <div className="signupInput">
          <small className="small">{errors.email && errors.email}</small>
          <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleForm} autoComplete="off" />
        </div>
        <div className="signupInput">
          <small className="small">{errors.password && errors.password}</small>
          <FaEye className="eye" onClick={() => setHidden(!hidden)} />

          <input type={hidden ? "password" : "text"} name="password" placeholder="Please, enter your password" onChange={handleForm} autoComplete="off" />
        </div>
        <div className="signupInput">
          <small className="small">{errors.userPicture && errors.userPicture}</small>
          <input type="text" name="userPicture" placeholder="Please, enter the URL of your picture" onChange={handleForm} autoComplete="off" />
        </div>
        <div className="signupInput">
          <small className="small">{errors.country && errors.country}</small>
          <select name="country" id="" onChange={handleForm}>
            <option>Choose your country</option>
            {countryList.map(country => <option value={country.name} key={country.name}>{country.name}</option>)}
          </select>
        </div>
        <button className="logUserBtn" onClick={handleClick}>Sign up!</button>
        <p>Already have an account?  <Link to='/signin' className="logLink">Sign in here!</Link></p>
        <p>Or you can sign up with Google</p>
        <div className="googleBtn">
          <GoogleLogin
            clientId="64572824100-laueolo93op2un8m3ajq5g9t8dkriduv.apps.googleusercontent.com"
            buttonText="Create an account with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
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
  signUp: userActions.signUp
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
