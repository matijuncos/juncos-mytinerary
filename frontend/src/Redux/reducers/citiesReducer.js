const initState = {
  cities: [],
  filteredCities: [],
  allItineraries: []
}

const citiesReducer = (state = initState, action) =>{
  switch(action.type){
    case "GET_CITIES":
      return{
        ...state,
        cities: action.payload,
        filteredCities: action.payload
      }
      case "GET_INPUT_VALUE":
        return{
          ...state,
          inputValue: action.payload,
          filteredCities: state.cities.filter(city => city.cityName.toLowerCase().indexOf(action.payload.toLowerCase().trim()) === 0)
        }  

    default:
      return state
  }
}

export default citiesReducer