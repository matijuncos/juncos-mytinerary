import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiWorld } from "react-icons/gi";
import axios from 'axios';
import { connect } from 'react-redux'
import userActions from '../Redux/actions/userActions';


const SignUp = (props) => {
  const { signUp } = props
  const [newUser, setNewUser] = useState({})
  const [countryList, setCountryList] = useState([])

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
  const handleClick = () => {
    signUp(newUser)
  }
  console.log(props)
  return (
    <div className="centrar forms">
      <div className="form">
        <GiWorld className="worldIcon" />
        <h2>Sign up!</h2>
        <input type="text" name="firstName" placeholder="Please, enter your first name" onChange={handleForm} />
        <input type="text" name="lastName" placeholder="Please, enter your last name" onChange={handleForm} />
        <input type="email" name="email" placeholder="Please, enter your email adress" onChange={handleForm} />
        <input type="password" name="password" placeholder="Please, enter your password" onChange={handleForm} />
        <input type="text" name="userPicture" placeholder="Please, enter the URL of your picture" onChange={handleForm} />
        <select name="country" id="" onChange={handleForm}>
          <option >Choose your country</option>
          {countryList.map(country => <option value={country.name} key={country.name}>{country.name}</option>)}
        </select>
        <button className="logUserBtn" onClick={handleClick}>Sign up!</button>

        <p>Already have an account?  <Link to='/signin' className="logLink">Sign in here!</Link></p>
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
