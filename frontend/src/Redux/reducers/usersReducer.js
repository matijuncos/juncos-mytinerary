const initState = {
  loggedUser: null
}

const userReducer = (state = initState, action) =>{
  switch (action.type) {
    case "SIGN_UP":
      return{
        ...state,
        loggedUser: action.payload
      }
     case "SIGN_IN":
       return{
         ...state,
         loggedUser: action.payload
       }
       case "SIGN_OUT":
         return{
           ...state,
           loggedUser: null
         }
    default: 
      return state
  }
}

export default userReducer