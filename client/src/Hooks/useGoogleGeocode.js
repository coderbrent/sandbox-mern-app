import { useState } from 'react'

const useGoogleGeocode = () => {
  const [coords, setCoords] = useState({ lat: '', lng: '' })
  const [placesId, setPlacesId] = useState({ id: ''})
  const [dataObj, setDataObj] = useState([])

const getAddressData = inputAddress => {
  fetch(`/searchbyaddress/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({ userAddress: inputAddress })
  }).then(res => { 
    return res.json()
  }).then(json => {
    console.log(json)
    setCoords({ 
      lat: json.geometry.location.lat, 
      lng: json.geometry.location.lng 
    });
    setPlacesId(json.place_id);
    setDataObj([json])
  })
}

  return {
    coords,
    placesId,
    getAddressData,
    dataObj,
  }

}

export default useGoogleGeocode;
