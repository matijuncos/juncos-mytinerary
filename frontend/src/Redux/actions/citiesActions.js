const citiesAction = {
  getCities: () =>{
    return async (dispatch, getState) =>{
      const response = await fetch('http://localhost:4000/api/cities')
      const cities = await response.json()
      dispatch({
        type: "GET_CITIES",
        payload: cities.results
      })
      }
    },
  getFilteredCities: (input) =>{
    return (dispatch, getState) =>{
      dispatch({
        type: "GET_INPUT_VALUE",
        payload: input
      })
    }
  }
}

export default citiesAction