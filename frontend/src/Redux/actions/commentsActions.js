import axios from 'axios'

const commentsActions = {
  sendComment: (comment, token, id) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('http://localhost:4000/api/comments/', {comment, token, id},{
          headers:{
            Authorization: 'Bearer ' + token
          }
        }) //Esta dirección será variable
        dispatch({
          type: "SEND_COMMENT",
          payload: response.data
          
        })
        return false
    }catch(error){
      console.log(error)
      }
    }
  }
}

export default commentsActions