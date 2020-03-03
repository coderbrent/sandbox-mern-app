import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faPoo, faHome, faAdjust } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return(
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
          Home
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
            Drivers
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
            <span>Vehicles</span>
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
            Settings
        </span>
      </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar;