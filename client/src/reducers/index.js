import { combineReducer } from 'react-redux'

export const initialState = {
  trips: {
    id: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    puTime: "",
    doTime: "",
    assignedDriver: "",
    suggestedDrivers: "",
  },
  vehicles: {
    id: "",
    year: "",
    make: "",
    model: "",
    currDriver: "",
  },
  drivers: {
    id: "",
    name: "",
    seniority: "",
    currVehicle: "",
  }
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TRIP':
    return {
      ...state, trips:
      [...state.trips, action.payload]
    }
    case 'ADD_TRIP':
    return {
      ...state, trips:
      [...state.trips, action.trip]
    }
    default:
      return state
  }
}



export default rootReducer;