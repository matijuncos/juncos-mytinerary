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
      console.log(action.payload.response)
      console.log('state' +state.itineraries._id)
      return{
        ...state,
        itineraries: state.itineraries.map( itinerary => itinerary._id === action.payload.response._id ? action.payload.response : itinerary)
      }
      
    default: return state
  }
}
export default itinerariesReducer

