import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Cities from './components/Cities'
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import City from './components/City';

function App() {
  return (
  <>
    <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route  path="/cities" component={Cities} />
          <Route  path='/itineraries/:id' component={City} />
        </Switch>  
    </Router>
    <Footer/>
  </>
  );
}

export default App;
