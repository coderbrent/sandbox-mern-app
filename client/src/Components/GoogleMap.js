import React from 'react';
import GoogleMapReact from 'google-map-react'
import MapPointer from '../Components/MapPointer'

const GoogleMap = ({ lat, lng, trips }) => {
  const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`
  return (
    <div style={{ height: `100%`, width: `100%`}}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: key,
        language: 'en'
      }}
      defaultCenter={{lat: lng, lng: lat}}
      center={{lat: lng, lng: lat}}
      defaultZoom={10}
    >
    {
      trips.map((trip, i) => (
        <div key={trip._id}>
          <MapPointer
            lat={trip.lng} 
            lng={trip.lat}
          />
        </div>
      ))
    }
      
    </GoogleMapReact>
    </div>
  )
}

export default GoogleMap;