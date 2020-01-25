import React, { useState, useEffect } from 'react'
import useGoogleGeocode from '../../Hooks/useGoogleGeocode'
import TripDisplay from '../../Components/TripDisplay/TripDisplay'
import VehicleTile from '../../Components/VehicleTile'
import NewTripForm from '../../Components/NewTripForm/NewTripForm'
import Spinner from 'react-spinkit'
import { Grid, Container } from '@material-ui/core'

const Dashboard = () => {
  const { getAddressData, dataObj } = useGoogleGeocode();
  const [vehicleList, setVehicleList] = useState()

  useEffect(() => {
    const findVehicles = async () => {
    await fetch(`/findVehicle/locate-vehicle`)
      .then(response => response.json())
      .then(json => {
        json.vehicles.sort((a, b) => a.distanceAwayInMinutes - b.distanceAwayInMinutes)
      setVehicleList(json)
      })
    }
    findVehicles();
  }, [])
  
  return (
    <>
    <TripDisplay />
    <NewTripForm />
    <Container>
      <Grid>
    {
      vehicleList ? vehicleList.vehicles.map((car, i) => (
        <div key={i} style={{ listStyle: 'none' }}>
        <VehicleTile 
          vehicleName={car.vehicleName}
          vehicleID={car.vehicleID}
          driver={car.currentDriver}
          distance={car.distanceAwayInMinutes}
          driverAvatar={car.driverAvatar}
        />
        </div>
      )) : <Spinner name="ball-scale-ripple" color="purple"/>
    }
      </Grid>
    </Container>
    </>
  )
}

export default Dashboard;