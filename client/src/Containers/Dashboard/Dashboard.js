import React, { useState, useEffect } from 'react'
import NewTripModal from '../../Components/Dashboard/NewTripModal/NewTripModal'
import TripTable from '../../Components/Dashboard/TripDisplay/TableTripDisplay'
import GoogleMapReact from 'google-map-react'
import MapPointer from '../../Components/Dashboard/GoogleMap/MapPointer/MapPointer'
import MaterialTripDisplay from '../../Components/Dashboard/TripDisplay/MaterialTripDisplay'
import NewVehicleModal from '../../Components/Dashboard/NewVehicleModal/NewVehicleModal'

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
    <div style={{ height: `33vh`, width: `100%`}}>
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
    <TripTable />

    <NewTripModal />
    <NewVehicleModal />
    <MaterialTripDisplay
      tripData={trips}
     
    />
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