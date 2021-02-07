import axios from 'axios'

const likeActions = {
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
        console.log(response)
      }catch(err){
        console.log(err)
      }
    }
  },
}

export default likeActions