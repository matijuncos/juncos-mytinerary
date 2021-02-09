import React, {useState} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Cities from './components/Cities'
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import City from './components/City';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { connect } from 'react-redux';
import userActions from './Redux/actions/userActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App(props) {

  const[refresh, setRefresh] = useState(true)

  if(props.loggedUser){
    var links = 
    <>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route  path="/cities" component={Cities} />
          <Route  path='/itineraries/:id' component={City} />
          <Redirect to='/'/>
        </Switch>
    </>
  }else if(localStorage.getItem('token')){
    props.preserveLog(localStorage.getItem('token'))
    .then(res =>{
      if (!res){
        setRefresh(!refresh)
      }
    })

  }else{
    links= 
    <>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route  path="/cities" component={Cities} />
          <Route  path='/itineraries/:id' component={City} />
          <Redirect to='/'/>
        </Switch>
      
    </>
  }
  return (
  <>
        <ToastContainer />

    <Router>
      <Navbar/>
          {links}
    </Router>
    <Footer/>
  </>
  );
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userR.loggedUser
  }
}

const mapDispatchToProps = {
  preserveLog: userActions.preserveLog
}
export default connect(mapStateToProps, mapDispatchToProps)(App)