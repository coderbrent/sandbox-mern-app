import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetData = url => {
  const [tripData, setTripData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTripData = () => {
      fetch(url, { 
        method: 'get',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        } 
      })
      .then(res => { 
        if(res.ok) {
          return res.json()
        } else {
          throw Error('Error fetching information!')
        }
      })
      .then(data => {
        setTripData(data)
      })
      .catch(error => {
        setError(error)
      })
    }
    getTripData()
  }, [url])

  return { tripData, error }
}

export default useGetData;