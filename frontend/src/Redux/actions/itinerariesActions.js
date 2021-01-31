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
  }
}



export default itinerariesActions