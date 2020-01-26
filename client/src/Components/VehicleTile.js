import React from 'react'
import { 
  GridListTile, 
  Card, 
  CardContent,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core/'
import Spinner from 'react-spinkit'

const VehicleTile = ({
  driver,
  driverAvatar,
  vehicleID,
  vehicleName,
  distance,
}) => {
  return (
    <GridListTile>
      <Grid item>
      <Card 
        style={{
          width: `250px`,
          backgroundColor: 'hsl(0, 0%, 21%)', 
          margin: '1em', 
          color: '#999'
        }}
      >
        <CardContent>
          <Typography 
            style={{
              fontStyle: 'Arial',
              fontWeight: 'bolder', 
              fontSize: '24px',
              color: 'white'
            }}
          >
          { vehicleName }
          </Typography>
          <Typography component="div">
            vehicle ID: { vehicleID }
          </Typography>
          <Typography component="div">
            <div 
              style={{
                display: `inline-flex`, 
                alignItems: `center`,
              }}
            >
              <Avatar 
                src={ 
                  driverAvatar ? driverAvatar 
                  : <Spinner /> 
                } 
              />
              <div 
                style={{ 
                  margin: `0em .5em`,
                  color: `white`
                }}
              >
                { driver }
              </div>
            </div>
          </Typography>
          <Typography component="div">
            Minutes from pickup: 
            { 
              distance < 70 ? 
              <div style={{ 
                  color: 'hsl(171, 100%, 41%)',
                  fontSize: '3rem',
                  fontWeight: 'bolder',
                }}
              > 
                { distance ? distance : <Spinner /> } 
              </div> : 
              <div 
                style={{ 
                  color: 'hsl(348, 100%, 61%)',
                  fontSize: '3rem',
                  fontWeight: 'bolder',
                }}
              > 
                { distance }
              </div>
            }
          </Typography>
        </CardContent>
      </Card>
      </Grid>
    </GridListTile>
  )
}

export default VehicleTile;