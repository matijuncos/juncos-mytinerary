import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userActions = {
  signUp: (newUser) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/user/signup', newUser)
        if(!response.data.success){
          return response.data
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data
        })
        toast.success("Your account was created succesfully!")

      }catch(err){
        console.log(err)
        toast.error("Oops! Something went wrong!")
      }
    }
  },
  signIn: (user) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/user/signin', user)
        if(!response.data.success){
          return response.data
        }
        dispatch({
          type: "USER_LOG",
          payload: response.data
        })
        toast.success("Welcome")

      }catch(err){
        toast.error("Oops! Something went wrong!")
        console.log(err)
      }
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
        
        dispatch({
          type: "USER_LOG",
          payload: {response: {...response.data.response}}
        })
        
      }catch(error){
        if(error.response.status === 401){
          localStorage.clear()
          toast("Oops! Something went wrong!")
      return false
    }
}
    }
  }
  
}

export default userActions