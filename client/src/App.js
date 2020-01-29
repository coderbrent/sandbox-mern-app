import React from 'react';
import Dashboard from '../src/Views/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from '../src/store'
// import Auth from '../src/Views/Auth/Auth'

function App() {
  return (
    <>
    <Provider store={store}>
      {/* <Auth /> */}
      <Dashboard />
    </Provider>
    </>
  );
}

export default App;
