import React from 'react';
import Dashboard from '../src/Containers/Dashboard/Dashboard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Drivers from './Containers/Drivers/Drivers';
import Navbar from '../src/Components/Dashboard/Navbar'
// import Auth from '../src/Views/Auth/Auth'

function App() {
  return (
    <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Navbar />
      <Dashboard />
      {/* <Drivers /> */}

    </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
