import React, { useState } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import useLoginForm from '../../Hooks/useLoginForm';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE&v-3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
   { props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} /> } 
  </GoogleMap>
)

const MyGoogleMap = () => {
  const { isLoggedIn } = useLoginForm();
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
    <>{ isLoggedIn ? 
      <MyMapComponent
        position={{ lat: 39.444, lng: 140.335 }}
        isMarkerShown={isMarkerShown}
        onMarkerClick={handleMarkerClick}
    /> : null }
    </>
  )

}

export default MyGoogleMap;