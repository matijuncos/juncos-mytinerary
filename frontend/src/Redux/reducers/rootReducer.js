import {combineReducers} from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import userReducer from './usersReducer'


const rootReducer = combineReducers({
  citiesR: citiesReducer,
  itinerariesR: itinerariesReducer,
  userR: userReducer,

})

export default rootReducer