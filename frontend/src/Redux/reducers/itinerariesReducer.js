const initState = {
  itineraries: [],
  
}

const itinerariesReducer = (state = initState, action) =>{
  switch(action.type){
    case "GET_ITINERARIES":
      return{
        ...state,
        itineraries: action.payload,
      }
    case "SEND_COMMENT":
      console.log(action.payload)
      return{
        ...state,
   //    itineraries: action.payload
      }
     
    default: return state
  }
}
export default itinerariesReducer

