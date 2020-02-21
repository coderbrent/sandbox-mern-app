import React from 'react'
import { DriveEtaRounded } from '@material-ui/icons';

const pinStyle = {
  borderRadius: '10px',
  transform: 'matrix(-1, 0, 0, 1, 10, 0)'
}

const MapPointer = (props) => {
    return (
      <DriveEtaRounded
        color="secondary"
        size='big' 
        style={pinStyle}
        hover={props.hover}
        onClick={props.onClick}
      />
    )
}
export default MapPointer