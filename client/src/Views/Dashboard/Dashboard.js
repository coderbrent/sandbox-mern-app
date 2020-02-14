import React, { useState, useEffect } from 'react'
import VehicleTile from '../../Components/VehicleTile'
import VehicleDisplay from '../../Components/VehicleDisplay'
import Spinner from 'react-spinkit'
import TripDisplay from '../../Components/TripDisplay/TripDisplay'
import NewTripModal from '../../Components/NewTripModal/NewTripModal'
import TripTable from '../../Components/TripDisplay/NewTripDisplay'
import GoogleMapReact from 'google-map-react'
import MapPointer from '../../Components/MapPointer'
import NewTripForm from '../../Components/NewTripForm/NewTripForm'

const Dashboard = () => {
  const [vehicleList, setVehicleList] = useState()
  const [trips, setTrips] = useState([])
  const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`

  useEffect(() => {
    const findVehicles = async () => {
    await fetch(`/locations/locate-vehicle`)
      .then(response => response.json())
      .then(json => {
        json.vehicles.sort((a, b) => a.distanceAwayInMinutes - b.distanceAwayInMinutes)
      setVehicleList(json)
      })
    }
    findVehicles();
  }, [])

  useEffect(() => {
    const getTrips = async () => {
      await fetch(`/trips/get-trips`)
        .then(response => response.json())
        .then(json => {
          setTrips(json)
        })
    }
    getTrips()
  }, [])
  
  return (
    <>
    <div style={{ height: `75vh`, width: `100%`}}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: key,
        language: 'en'
      }}
      center={{lat: 40.3135111, lng: -74.2880817 }}
      defaultCenter={{lat: 40.3135111, lng: -74.2880817}}
      defaultZoom={9}
    >
    {
      trips.map(trip => (
        <div key={trip._id}>
          <MapPointer
            // lat={trip.puAddr.location.coordinates[0]}
            // lng={trip.puAddr.location.coordinates[1]}
            lat={40.3135111}
            lng={-74.2880817}
          />
    </div>
      ))
    }
    </GoogleMapReact>
    </div>
    <NewTripForm />
    <NewTripModal />
    <TripTable />
    <TripDisplay />
    <VehicleDisplay>
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
    </VehicleDisplay>
    </>
  )
}

export default Dashboard;