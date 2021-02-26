import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const itinerariesActions = {
  getItineraries: (id) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await fetch('http://localhost:4000/api/itineraries/'+id) //Esta dirección será variable
        const itineraries = await response.json()
        dispatch({
          type: "GET_ITINERARIES",
          payload: itineraries.response,
          
        })
    }catch(error){
        toast.error("Oops! Something went wrong")
      }
    }
  },

  sendComment: (comment, token, id, commentObj) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/comments/', {comment, commentObj, id},{
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
                
        dispatch({
          type: "COMMENTS",
          payload: response.data
          
        })
        return false
    }catch(error){
      toast.error("Oops! Something went wrong")
      console.log(error)
      }
    }
  },
  deleteComment: (token, commentId, IdItinerary) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.put('http://localhost:4000/api/comments', { token, commentId, IdItinerary},{
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        dispatch({
          type: "COMMENTS",
         payload: response.data
          
        })
      }catch(error){
        console.log(error)
        toast.error("Oops! Something went wrong")

      }
    }
  },
  updateComment : (token, updatedComment, commentId, IdItinerary) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/commentupdate', { token, updatedComment, commentId, IdItinerary},{
          headers: {
            Authorization: 'Bearer ' + token
          }
          })
          dispatch({
            type: "COMMENTS",
            payload: response.data
          })
          
      }catch(error){
        console.log(error)
        toast.error("Oops! Something went wrong")

      }
    }
  },
  like: (token, itinerayId) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/like', {token, itinerayId},
        {
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        dispatch({
          type: "LIKES",
          payload: response.data
        })
        
      }catch(err){
        console.log(err)
        toast.error("Oops! Something went wrong")

      }
    }
  },
  dislike: (token, itinerayId) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/dislike', {token, itinerayId},
        {
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        dispatch({
          type: "LIKES",
          payload: response.data
        })
      }catch(err){
        console.log(err)
        toast.error("Oops! Something went wrong")

      }
    }
  }
}



export default itinerariesActions