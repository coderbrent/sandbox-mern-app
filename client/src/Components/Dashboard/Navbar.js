import React from 'react';
import Dashboard from '../../Containers/Dashboard/Dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faPoo, faHome, faAdjust } from '@fortawesome/free-solid-svg-icons'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import DriverDisplay from './DriverDisplay'
import TripDisplay from './TripDisplay'

const Navbar = () => {
  return(
    <Router>
    <nav style={{ color: `white` }}>
      <div
        style={{
          fontFamily: `roboto`,
          display: `flex`,
          alignItems: `center`,
          backgroundColor: `slategrey`,
          justifyContent: `space-between`,
        }}
      >
      <h3 
        style={{ 
          fontVariantCaps: `all-petite-caps`,
          fontSize: `2rem`,
          padding: `0rem`,
          marginLeft: `1rem`
        }}>Dispatch System</h3>
      <ul 
        style={{
          fontVariantCaps: `all-petite-caps`,
          listStyle: `none`,
          display: `flex`,
          alignItems: `center`,
          marginRight: `1rem`
        }}
      >
      <span 
        style={{ 
          display: `inline-flex`, 
          alignItems: `center`
        }}
      > 
        <FontAwesomeIcon icon={faHome} pull="left"/> 
          <Link to="/">Home</Link>
      </span>
      <li>
        <span 
          style={{ 
            display: `inline-flex`, 
            alignItems: `center`,
            padding: `.40rem`
          }}
        >
          <FontAwesomeIcon icon={faPoo} pull="left"/>
            <Link to="/driverdisplay">Drivers</Link>
        </span>
      </li>
      <li>
        <span
          style={{ 
            display: `flex`, 
            alignItems: `center`, 
            padding: `.40rem`,
          }}
        >
          <FontAwesomeIcon icon={faCar} pull="left"/>
            <Link to="/tripdisplay"><span>Trips</span></Link>
        </span>
      </li>
      <li>
        <span     
          style={{ 
            display: `flex`, 
            alignItems: `center`, 
            padding: `.40rem`
          }}
        >
          <FontAwesomeIcon icon={faAdjust} pull="left"/>
            <Link to="/settings">Settings</Link>
        </span>
      </li>
      </ul>
      </div>
    </nav>
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/driverdisplay">
        <DriverDisplay />
      </Route>
      <Route exact path="/tripdisplay">
        <TripDisplay />
      </Route>
    </Switch>
    </Router>
  )
}

export default Navbar;