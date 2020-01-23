import React from 'react';
// import Reservation from '../src/Views/Reservation/Reservation'
import LoginView from '../../client/src/Views/Auth/LoginView'
import Dashboard from '../../client/src/Views/Dashboard/Dashboard'
import NewTripForm from './Components/NewTripForm/NewTripForm'

function App() {
  return (
    <>
      {/* <Reservation /> */}
      {/* <LoginView /> */}
      <NewTripForm />
      <Dashboard />
    </>
  );
}

export default App;
