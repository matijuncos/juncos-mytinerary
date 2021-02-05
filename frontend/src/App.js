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

function App(props) {
  console.log(props)
  if(!props.loggedUser){
    var links = 
    <>
      <Route exact path="/" component={Main} />
      <Route path='/signin' component={SignIn}/>
      <Route path='/signup' component={SignUp}/>
      <Route  path="/cities" component={Cities} />
    </>
  }else{
    links= 
    <>
        <Route exact path="/" component={Main} />
        <Route  path="/cities" component={Cities} />
        <Route  path='/itineraries/:id' component={City} />
        <Redirect to='/'/>
    </>
  }
  return (
  <>
    <Router>
      <Navbar/>
        <Switch>
          {links}
        </Switch>  
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