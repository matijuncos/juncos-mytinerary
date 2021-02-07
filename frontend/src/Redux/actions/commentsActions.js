import axios from 'axios'

const commentsActions = {
  sendComment: (comment, token, id) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/comments/', {comment, token, id},{
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
  }
}

export default commentsActions