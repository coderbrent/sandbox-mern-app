import React, { useState, useEffect } from 'react'
import NewTripModal from '../../Components/Dashboard/NewTripModal/NewTripModal'
import TripTable from '../../Components/Dashboard/TripDisplay/TableTripDisplay'
import MaterialTripDisplay from '../../Components/Dashboard/TripDisplay/MaterialTripDisplay'
import NewVehicleModal from '../../Components/Dashboard/NewVehicleModal/NewVehicleModal'
import { Button } from '@material-ui/core';
import GoogleMap from '../../Components/Dashboard/GoogleMap/GoogleMap'
import NewDriverModal from '../../Components/Dashboard/NewDriverModal/NewDriverModal'
import DriverDisplay from '../../Components/Dashboard/DriverDisplay';

const Dashboard = () => {
  const [trips, setTrips] = useState([])
  const [drivers, setDrivers] = useState([])
  const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`

  // useEffect(() => {
  //   const findVehicles = async () => {
  //     await fetch(`/locations/locate-vehicle`)
  //       .then(response => response.json())
  //       .then(json => {
  //         json.vehicles.sort((a, b) => a.distanceAwayInMinutes - b.distanceAwayInMinutes)
  //         setVehicleList(json)
  //         console.log(vehicleList)
  //     })
  //   }
  //   findVehicles();
  // }, [])

  // useEffect(() => {
  //   const getTrips = async () => {
  //     await fetch(`/trips/get-trips`)
  //       .then(response => response.json())
  //       .then(result => {
  //         setTrips(result)
  //       })
  //   }
  //   getTrips()
  // }, [])

  useEffect(() => {
    const getDrivers = async () => {
      await fetch(`/drivers/all-drivers`)
        .then(response => response.json())
        .then(result => {
          setDrivers(result)
        })
    }
    getDrivers()
  }, [])
  
  return (
    <>
    <GoogleMap lat={-74.5892} lng={38.54993} trips={trips}/>
    <NewTripModal />
    <NewVehicleModal />
    <NewDriverModal />
    <DriverDisplay />
    {/* <VehicleDisplay>
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
    </VehicleDisplay> */}
    </>
  )
}

export default Dashboard;