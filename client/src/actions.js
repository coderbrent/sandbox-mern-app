import { 
  ADD_TRIP, 
  DELETE_TRIP, 
  UPDATE_TRIP, 
  GET_TRIP 
} 
from './actionTypes'
import { useDispatch } from 'react-redux'

export const getTrips = () => dispatch => {
  useDispatch();
  fetch(`/`)
    .then(res => 
      useDispatch({})
    )
}


export function addTrip(trip) {
  return {
    type: ADD_TRIP,
    payload: trip
  }
}