const initState = {
  comments: {},

}

const citiesReducer = (state = initState, action) =>{
  switch(action.type){
    case "SEND_COMMENT":
      return{
        ...state,
        comments: action.payload,
        
      }
    
    default:
      return state
  }
}

export default citiesReducer