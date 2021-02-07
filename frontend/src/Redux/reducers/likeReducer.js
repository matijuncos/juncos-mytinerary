const initState = {
  likes:{}
}

const likeReducer = (state = initState, action)=>{
  switch(action.type){
    case "LIKE":
      return{
        ...state,
        likes: action.payload
      }
    case "DISLIKE":
      return{
        ...state,
        likes: action.payload
      }
      default: 
        return state
  }
}

export default likeReducer