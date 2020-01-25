import React from 'react'
import { 
  GridListTile, 
  Card, 
  CardContent, 
  Typography,
  CardMedia,
  Avatar,
} from '@material-ui/core/'

const VehicleTile = ({
  driver,
  driverAvatar,
  vehicleID,
  vehicleName,
  vehicleImg,
  distance,
}) => {
  return (
    <GridListTile>
      <Card 
        style={{ 
          backgroundColor: 'lightgrey', 
          margin: '1em', 
          color: '#444'
        }}
      >
      {/* <CardMedia image={vehicleImg} /> */}
        <CardContent>
          <Typography 
            style={{ 
              fontWeight: 'bolder', 
              fontSize: '24px'
            }}
          >
          { vehicleName }
          </Typography>
          <Typography component="div">
            vehicle #: { vehicleID }
          </Typography>
          <Typography component="div">
            <div 
              style={{ 
                display: `inline-flex`, 
                alignItems: `center`,
              }}
            >
              <Avatar src={ driverAvatar } />
              <div style={{ margin: `0em .5em` }}>
                Driver: { driver }
              </div>
            </div>
          </Typography>
          <Typography component="div">
            Minutes from pickup: 
            { 
              distance < 70 ? 
              <div style={{ color: 'green'}}> 
                { distance } 
              </div> : 
              <div style={{ color: 'red'}}> 
                { distance }
              </div>
            }
          </Typography>
        </CardContent>
      </Card>
    </GridListTile>
  )
}

export default VehicleTile;