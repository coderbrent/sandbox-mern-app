import { useEffect, useState } from 'react'

const useGetData = url => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    fetch(url, { headers: { 'Content-Type': 'application/json' } })
      .then(res => { 
        if(res.ok) {
         return res.json()
        } else {
          throw Error('Error fetching information!')
        }
      })
      .then(data => {
        setUserData(data)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
      })
  }, [url])
 
  return { userData, isLoading, error }
}

export default useGetData;