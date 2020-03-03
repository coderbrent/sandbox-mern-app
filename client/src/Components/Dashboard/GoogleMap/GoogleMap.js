import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react'
import MapPointer from './MapPointer/MapPointer'

const MapMarker = ({ text }) => <div>{text}</div>

const GoogleMap = ({ lat, lng, trips }) => {
  const [coords, setCoords] = useState(null)

  const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`
  return (
    <div style={{ height: `33vh`, width: `100%`}}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: key,
        language: 'en'
      }}
      defaultCenter={{ lat: 39.9490, lng: -79.2949 }}
      center={{lat: 39.9490, lng: -79.2949 }}
      defaultZoom={10}
    >
    
    <MapMarker 
      lat={36.2949}
      lng={-77.39029}
    />
    </GoogleMapReact>
    </div>
  )
}

export default GoogleMap;