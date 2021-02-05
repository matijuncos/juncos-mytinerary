import axios from 'axios'

const userActions = {
  signUp: (newUser) =>{
    return async (dispatch, getState) =>{
      const response = await axios.post('http://localhost:4000/api/user/signup', newUser)
      console.log(response)
      if(!response.data.success){
        return response.data
      }

      dispatch({
        type: "USER_LOG",
        payload: response.data
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
          type: "USER_LOG",
          payload: response.data
        })
    }
  },
  signOut: () =>{
    return async (dispatch, getState) =>{
      dispatch({
        type: "SIGN_OUT",
      })
    }
  },
  preserveLog: (token) =>{
    return async (dispatch, getState) =>{
try{
    const response = await axios.post('http://localhost:4000/api/user/storage', {token}, {
      headers:{
        Authorization: 'Bearer ' + token
      }
    })
    console.log(response)

   dispatch({
     type: "USER_LOG",
     payload: {response: {...response.data.response}}
   })

}catch(error){
    if(error.response.status === 401){
      localStorage.clear()
      return false
    }
}
    }
  }
  
}

export default userActions