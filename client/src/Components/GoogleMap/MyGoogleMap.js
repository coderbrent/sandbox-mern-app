import React, { useState } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const key = ""

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v-3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.42345, lng: -74.288089 }}
  >
   { props.isMarkerShown && <Marker position={{ lat: 41.42345, lng: -74.288089 }} /> } 
  </GoogleMap>
)

const MyGoogleMap = () => {
  const [isMarkerShown, setIsMarkerShown ] = useState(true)

  const delayedShowMarker = () => {
    setTimeout(() => {
      setIsMarkerShown(true)
    }, 3000)
  }

  const handleMarkerClick = () => {
    setIsMarkerShown(false)
    delayedShowMarker()
  }

  return ( 
    <>
      <MyMapComponent
        position={{ lat: 41.42345, lng: -74.288089 }}
        isMarkerShown={isMarkerShown}
        onMarkerClick={handleMarkerClick}
      /> 
    </>
  )
}

export default MyGoogleMap;