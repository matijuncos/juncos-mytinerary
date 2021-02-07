import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiWorld } from "react-icons/gi";
import axios from 'axios';
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import { useAlert } from 'react-alert'


const SignUp = (props) => {
  const alert = useAlert()
  const { signUp } = props
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
    // if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.password === '' || newUser.userPicture === '' || newUser.country === '') {
    //   alert.error("Please complete the form to sign up!")
    //   return false
    // }
    const res = await signUp(newUser)
    if (res && !res.success) {
      console.log(props)
      console.log(res)
      res.errors.map(error => {
        failedInputs[error.context.label] = error.message
        return false

      })
      setErrors(failedInputs)
    } else {
      alert.success("Your account was created successfully!")
      props.history.push('/')
    }
  }

  const responseGoogle = async (response) => {
    if (response.error) {
      alert.error('Try Again')
    } else {

      await signUp({
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        userPicture: response.profileObj.imageUrl,
        country: 'Argentina'
      })
      alert.success("Your account was created successfully!")
    }
  }
  return (
    <div className="centrar forms">

      <div className="form">
        <GiWorld className="worldIcon" />
        <h2>Sign up!</h2>
        <div className="signupInput">
          <small className="small">{errors.firstName && errors.firstName}</small>
          <input type="text" name="firstName" placeholder="Please, enter your first name" onChange={handleForm} />
        </div>
        <div className="signupInput">
          <small className="small">{errors.lastName && errors.lastName}</small>
          <input type="text" name="lastName" placeholder="Please, enter your last name" onChange={handleForm} />
        </div>
        <div className="signupInput">
          <small className="small">{errors.email && errors.email}</small>
          <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleForm} />
        </div>
        <div className="signupInput">
          <small className="small">{errors.password && errors.password}</small>
          <input type="password" name="password" placeholder="Please, enter your password" onChange={handleForm} />
        </div>
        <div className="signupInput">
          <small className="small">{errors.userPicture && errors.userPicture}</small>
          <input type="text" name="userPicture" placeholder="Please, enter the URL of your picture" onChange={handleForm} />
        </div>
        <div className="signupInput">
          <small className="small">{errors.country && errors.country}</small>
          <select name="country" id="" onChange={handleForm}>
            <option >Choose your country</option>
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
