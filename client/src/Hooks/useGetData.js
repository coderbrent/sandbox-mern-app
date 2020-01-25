import { useEffect, useState } from 'react'

const useGetData = url => {
  const [tripData, setTripData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTripData = () => {
      setIsLoading(true)
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
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
      })
    }
    getTripData()
  }, [url])

  return { tripData, isLoading, error }
}

export default useGetData;