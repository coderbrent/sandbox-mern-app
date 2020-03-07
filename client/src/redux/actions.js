import { REQUEST_TRIPS, IS_FETCHING, RECEIVE_TRIPS } from './actionTypes'

export const requestTrips = trips => ({
  type: REQUEST_TRIPS,
  payload: {
    trips
  }
})

export const recieveTrips = (trips, json) => ({
  type: RECEIVE_TRIPS,
  trips,
  trips: json.data.children.map(child => child.data),
  recievedAt: Date.now()
})

export function fetchTrips(trips) {
  return function(dispatch) {
    dispatch(requestTrips(trips))

    return fetch(`/trips/get-trips`)
      .then(response => response.json()),
      error => console.log('An error occured.', error)
      .then(json => dispatch(recieveTrips(trips, json)))
  }
}