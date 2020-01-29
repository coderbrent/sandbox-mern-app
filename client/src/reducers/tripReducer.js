import { GET_TRIP } from '../actionTypes'

const tripReducer = () => {
  return {
    type: GET_TRIP,
    payload: 'Stent'
  }
}

export default tripReducer;