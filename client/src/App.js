import React from 'react';
import Dashboard from '../src/Views/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from '../src/store'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
// import Auth from '../src/Views/Auth/Auth'

function App() {
  return (
    <>
    {/* <Provider store={store}> */}
      {/* <Auth /> */}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Dashboard />
      </MuiPickersUtilsProvider>
    {/* </Provider> */}
    </>
  );
}

export default App;
