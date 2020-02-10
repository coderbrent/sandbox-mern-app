import React, { useState, useEffect } from 'react'
import useGetData from '../../Hooks/useGetData'
import Container from '@material-ui/core/Container'
import TripTile from '../TripTile'
import Spinner from 'react-spinkit'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'

const TripDisplay = () => {
  const url = '/trips/get-trips'
  const [trips, setTrips] = useState(null)
  const { tripData, error } = useGetData(url);

  return (
    <>
    <Container>
      <Grid container>
      { tripData ?
        tripData.map((trip, i) => (
          <Grid
            xs={12}
            item key={i} 
            style={{ listStyle: 'none', margin: '1em'}}
          >
            <TripTile 
              pickupTime={trip.pickupTime}
              street={trip.pickupAddr.street1}
              city={trip.pickupAddr.city}
              state={trip.pickupAddr.state}
            />
          </Grid>
        )) : <Spinner color="purple" />
      }
      </Grid>
      { trips }
    </Container>
    </>
  )
}

export default TripDisplay;