//TODO: Move all auth logic and handling to the server.

import { useState } from 'react'

const useLoginForm = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ username: '' })

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
        ...inputs, 
        [e.target.name]: e.target.value
      })
    )
  }

  const handleLogout = e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(token) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
    } else {
      console.log('you are not logged in')
      return null;
    }
  }

  const handleSubmit = e => {
    if(e) {
      e.preventDefault();
    }

    const loginData = {
      username: inputs.username,
      password: inputs.password,
    }

// TODO: dynamically change the route from login to signup conditionally
// based on what component is visible/active

   fetch('/users/login', { 
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(loginData),
    })
    .then((res, error) => { 
      if(res.ok) {
        return res.json()
      } else {
        return res.json({ message: error })
      }
    }).then(jsonData => {
      const token = jsonData.token
        console.log(jsonData)
        localStorage.setItem('token', token)
        setIsLoggedIn(true)
        setUser({ username: jsonData.user.email })
      })
  }

  return {
    handleSubmit,
    handleLogout,
    handleInputChange,
    inputs,
    isLoggedIn,
    user
  }
}

export default useLoginForm;
