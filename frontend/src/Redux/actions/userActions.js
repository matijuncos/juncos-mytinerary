import axios from 'axios'

const userActions = {
  signUp: (newUser) =>{
    return async (dispatch, getState) =>{
      const res = await axios.post('http://localhost:4000/api/user/signup', newUser)
 
      dispatch({
        type: "SIGN_UP",
        payload: res.data
      })
    }
  },
  signIn: (user) =>{
    return async (dispatch, getState) =>{
      const response = await axios.post('http://localhost:4000/api/user/signin', user)
      if(!response.data.success){
        return response.data
      }
        dispatch({
          type: "SIGN_IN",
          payload: response.data
        })
    }
  },
  signOut: () =>{
    return (dispatch, getState) =>{
      dispatch({
        type: "SIGN_OUT",
      })
    }
  }
}

export default userActions