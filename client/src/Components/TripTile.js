import React, { useState } from 'react'
import { 
  GridListTile, 
  Card, 
  CardContent, 
  Typography,
  Button,
} from '@material-ui/core/'
import { DeleteOutlineTwoTone, RemoveCircleOutline } from '@material-ui/icons';
import GoogleMapReact from 'google-map-react'
import MapPointer from './MapPointer';
import DriverSelectModal from '../Components/DriverSelectModal/DriverSelectModal'

const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`

const TripTile = ({
  tripID,
  lat,
  lng,
  pickupTime,
  tripDate,
  dropoff,
  street,
}) => {

  const deleteTripById = id => {
    fetch(`/trips/delete-trip/${id}`, {
      method: `DELETE`
    })
  }

  const removeDriver = id => {
    fetch(`/trips/remove-driver/${id}`, { 
      method: 'PUT'
    })
  }
  
  return (
    <>
    <GridListTile>
    <Card
      style={{ 
        backgroundColor: '#999', 
        margin: '1em', 
        color: 'whitesmoke',
      }}
    >
    <CardContent>
    <div 
      style={{ 
        display: `inline-flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
        width: `100%`
      }}
    >
    <div>
      <Typography 
        style={{ 
          fontWeight: 'bolder', 
          fontSize: '24px'
        }}
      >
      { pickupTime }, { tripDate }
      </Typography>
    </div>
    <DriverSelectModal tripId={tripID} />
      <a
        href="#"
        role="button"
        style={{ color: `whitesmoke` }}
        onClick={() => removeDriver(tripID)}
      >
      <RemoveCircleOutline fill="white" />
      </a>
      <a 
        href="#"
        role="button"
        style={{ color: `whitesmoke`}}
        onClick={() => deleteTripById(tripID)}
      >
        <DeleteOutlineTwoTone />
      </a>
    </div>
    <Typography>
      Pickup: <strong>{ street }</strong>
    </Typography>
    <Typography>
      Dropoff: { dropoff }
    </Typography>
    <div style={{ height: `300px`, width: `100%`}}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: key,
          language: 'en'
        }}
        defaultCenter={{lat: lng, lng: lat}}
        center={{lat: lng, lng: lat}}
        defaultZoom={10}
      >
        <MapPointer
          lat={lng} 
          lng={lat}
        />
      </GoogleMapReact>
    </div>
    </CardContent>
    </Card>
    </GridListTile>
    </>
  )

}

export default TripTile;