import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { REQUEST_TRIPS, RECEIVE_TRIPS } from '../../redux/actionTypes'
import { requestTrips, recieveTrips } from '../../redux/actions'

const TripDisplay = () => {
  const trips = useSelector(state => state.trips)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllTrips = async () => {
      await fetch(`/trips/get-trips`)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: RECEIVE_TRIPS, payload: recieveTrips(result) })
        })
    }
    fetchAllTrips();
  }, [])
  return(
    <div>
      {trips.trips.map(trip => (
        <div>{trip}</div>
      ))}
    </div>
  )
}

export default TripDisplay;