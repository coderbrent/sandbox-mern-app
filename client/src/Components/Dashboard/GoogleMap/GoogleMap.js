import React from 'react';
import GoogleMapReact from 'google-map-react'

const MapMarker = ({ text }) => <div>{text}</div>

const GoogleMap = ({ lat, lng, trips }) => {
  // const [coords, setCoords] = useState(null)

  const key = `AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE`
  return (
    <div 
      style={{ 
        borderBottom: `5px solid rgba(0, 0, 0, .5)`,
        marginTop: `1rem`, 
        height: `33vh`, 
        width: `100%`
      }}
    >
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