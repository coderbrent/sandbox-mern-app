import React, { useState } from 'react'
import useGetData from '../../../Hooks/useGetData'
import Container from '@material-ui/core/Container'
import TripTile from '../TripTile'
import Spinner from 'react-spinkit'
import Grid from '@material-ui/core/Grid'

const TripDisplay = () => {
  const url = '/trips/get-trips'
  const [trips, setTrips] = useState(null)
  const { tripData, error } = useGetData(url);

  return (
    <>
    <Container>
      <Grid container>
      { tripData ?
        tripData.map(trip => (
          <Grid
            xs={12}
            item key={trip._id}
            style={{ listStyle: 'none', margin: '1em'}}
          >
            <TripTile
              tripDate={trip.puDate}
              tripID={trip._id}
              pickupTime={trip.puTime}
              street={trip.puAddr.text_address}
              lat={trip.puAddr.location.coordinates[0]}
              lng={trip.puAddr.location.coordinates[1]}
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