const initState = {
  loggedUser: null
}

const userReducer = (state = initState, action) =>{
  switch (action.type) {
    case "USER_LOG":
      localStorage.setItem('firstName', action.payload.response.firstName)
      localStorage.setItem('userPicture', action.payload.response.userPicture)
      localStorage.setItem('token', action.payload.response.token)
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