import React from 'react'
import useLoginForm from '../../Hooks/useLoginForm'

const Login = () => {
  const { 
    handleInputChange, 
    handleSubmit, 
    isLoggedIn,
    user,
    handleLogout,
  } = useLoginForm();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
          <h5>{ isLoggedIn ? `you are now logged in as ${user.username}` : null }</h5>
          <label>username:</label>
            <input required
              name="username"
              type="text"
              onChange={handleInputChange}
            />
          <label>password:</label>
            <input required
              name="password"
              type="password"
              onChange={handleInputChange}
            />
          { isLoggedIn ? 
            <button onClick={handleLogout}>logout</button> : 
            <input type="submit" value="login" />
          }
      </form>
    </div>
  )
}

export default Login;