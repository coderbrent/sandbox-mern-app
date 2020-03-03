import React from 'react';
import { Container, Grid } from '@material-ui/core'

const VehicleDisplay = ({ children }) => {

  return (
    <>
      <Container style={{ backgroundColor: `#222`}}>
        <h1 
          style={{ 
            color: `#888`,
            fontFamily: `Roboto`,
            fontSize: `4rem`,
            margin: `0`
          }}
        > 
        </h1>
        <Grid
          container
        >
          { children }
        </Grid>
      </Container>
    </>
  )
}

export default VehicleDisplay;