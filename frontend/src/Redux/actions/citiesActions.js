import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const citiesAction = {
  getCities: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await fetch('https://juncos-mytinerary.herokuapp.com/api/cities')
        const cities = await response.json()
        dispatch({
          type: "GET_CITIES",
          payload: cities.results
        })
    } catch(error){
       console.log(error);
       toast.error('Oops! Seomthing went wrong')
        }
    }
    },
  getFilteredCities: (input) =>{
    return (dispatch, getState) =>{
      dispatch({
        type: "GET_INPUT_VALUE",
        payload: input
      })
    }
  },
  
}

export default citiesAction