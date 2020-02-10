import React from 'react'
import { 
  GridListTile, 
  Card, 
  CardContent, 
  Typography,
} from '@material-ui/core/'

const TripTile = ({
  tripID,
  reqVehicle,
  pickupTime,
  dropoff,
  lat,
  lng,
  city,
  state,
  street,
  suggestedDrivers,
}) => {
  return (
    <>
    <GridListTile>
      <Card
        style={{ 
          backgroundColor: '#888', 
          margin: '1em', 
          color: 'whitesmoke',
          cursor: 'pointer',
        }}
      >
        <CardContent>
          <Typography 
            style={{ 
              fontWeight: 'bolder', 
              fontSize: '24px'
            }}
          >
            { pickupTime }
          </Typography>
          <Typography 
            component="ul"
            style={{ listStyle: `none`}}  
          >
            <li>Street: <strong>{ street }</strong></li>
            <li>City: <strong>{ city }</strong></li>
            <li>State: <strong>{ state }</strong></li>
          </Typography>
          <Typography component="p">
            Dropoff: { dropoff }
          </Typography>
        </CardContent>
      </Card>
    </GridListTile>
    </>
  )

}

export default TripTile;