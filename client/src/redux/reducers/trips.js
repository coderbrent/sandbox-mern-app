import { ADD_TRIP, DELETE_TRIP, UPDATE_TRIP, REQUEST_TRIPS } from '../actionTypes'

const initialState = {
  trips: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_TRIPS: {
      return {
        ...state,
        trips: [...state.trips, action.payload],
      }
    }
    default:
      return state;
  }
}