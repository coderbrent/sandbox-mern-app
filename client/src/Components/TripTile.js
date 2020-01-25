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
}) => {
  return (
    <>
    <GridListTile>
      <Card 
        style={{ 
          backgroundColor: '#888', 
          margin: '1em', 
          color: 'whitesmoke'
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
            <Typography variant="body">
              <li>Street: { street }</li>
              <li>City: { city }</li>
              <li>State: { state }</li>
            </Typography>
          </Typography>
          <Typography>
            Dropoff: { dropoff }
          </Typography>
        </CardContent>
      </Card>
    </GridListTile>
    </>
  )

}

export default TripTile;