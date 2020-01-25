import React, { useState, useEffect } from 'react'
import useGetData from '../../Hooks/useGetData'
import Container from '@material-ui/core/Container'
import TripTile from '../TripTile'
import Spinner from 'react-spinkit'
import Grid from '@material-ui/core/Grid'

const TripDisplay = () => {
  const url = '/tripQueue/trips'
  const { tripData, error } = useGetData(url);
  const [ errorMessage, setErrorMessage ] = useState({ message: ''})


  return (
    <>
    { error ? setErrorMessage(error) : null }
    { 
      error ? 
        <p> 
          There was an error loading! {errorMessage} 
        </p> 
      : null 
      }
    <Container>
      <Grid container>
      { tripData ?
        tripData.trips.map((trip, i) => (
          <Grid
            xs={12}
            spacing={2}
            item key={i} 
            style={{ listStyle: 'none', margin: '1em'}}
          >
            <TripTile 
              pickupTime={trip.pickupTime}
              street={trip.pickup.street}
              city={trip.pickup.city}
              state={trip.pickup.state}
              dropoff={trip.dropoff}
            />
          </Grid>
        )) : <Spinner color="purple" />
      }
      </Grid>
    </Container>
    </>
  )

}

export default TripDisplay;