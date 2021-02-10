const initState = {
  itineraries: []
  
}

const itinerariesReducer = (state = initState, action) =>{
  switch(action.type){
    case "GET_ITINERARIES":
      return{
        ...state,
        itineraries: action.payload,
      }
    case "COMMENTS_LIKES":

      return{
        ...state,
        itineraries: state.itineraries.map( itinerary => itinerary._id === action.payload.response._id ? action.payload.response : itinerary)
      }
      
    default: return state
  }
}
export default itinerariesReducer

