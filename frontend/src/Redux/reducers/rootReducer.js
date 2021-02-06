import {combineReducers} from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import userReducer from './usersReducer'
import commentsReducer from './commentsReducer'

const rootReducer = combineReducers({
  citiesR: citiesReducer,
  itinerariesR: itinerariesReducer,
  userR: userReducer,
  commentR: commentsReducer
})

export default rootReducer