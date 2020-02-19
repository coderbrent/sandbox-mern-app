import React from 'react';
import Dashboard from '../src/Containers/Dashboard/Dashboard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
// import Auth from '../src/Views/Auth/Auth'

function App() {
  return (
    <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Dashboard />
    </MuiPickersUtilsProvider>
    </>
  );
}

export default App;
