import React from 'react'
import NewTripModal from '../../Components/Dashboard/NewTripModal/NewTripModal'
import NewVehicleModal from '../../Components/Dashboard/NewVehicleModal/NewVehicleModal'
import GoogleMap from '../../Components/Dashboard/GoogleMap/GoogleMap'
import NewDriverModal from '../../Components/Dashboard/NewDriverModal/NewDriverModal'
import DriverDisplay from '../../Components/Dashboard/DriverDisplay';

const Dashboard = () => {
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
  
  return (
    <>
    <GoogleMap lat={-74.5892} lng={38.54993} />
    <NewTripModal />
    <NewVehicleModal />
    <NewDriverModal />
    <DriverDisplay />

    </>
  )
}

export default Dashboard;