import {combineReducers} from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import userReducer from './usersReducer'
import commentsReducer from './commentsReducer'
import likeReducer from './likeReducer'

const rootReducer = combineReducers({
  citiesR: citiesReducer,
  itinerariesR: itinerariesReducer,
  userR: userReducer,
  commentR: commentsReducer,
  likeR: likeReducer
})

export default rootReducer