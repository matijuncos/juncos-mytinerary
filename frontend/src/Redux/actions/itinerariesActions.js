import axios from 'axios'


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
      console.log(error)
      }
    }
  },
  sendComment: (comment, token, id, itineraries) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/comments/', {comment, token, id, itineraries},{
          headers:{
            Authorization: 'Bearer ' + token
          }
        })
        
        dispatch({
          type: "SEND_COMMENT",
          payload: response.data
          
        })
        return false
    }catch(error){
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
          type: "DEL_COMMENT",
          payload: response.data
          
        })
      }catch(error){
        console.log(error)
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
            type: "UPDATE_COMMENT",
            payload: response.data
          })
          
      }catch(error){
        console.log(error)
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
          type: "LIKE",
          payload: response.data
        })
        
      }catch(err){
        console.log(err)
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
          type: "DISLIKE",
          payload: response.data
        })
      }catch(err){
        console.log(err)
      }
    }
  }
}



export default itinerariesActions