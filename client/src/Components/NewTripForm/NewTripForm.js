import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { AccessAlarmOutlined, PlaceOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}));

const NewTripForm = () => {
  const [ inputs, setInputs ] = useState({ street: '', city: '', state: '', pickupTime: '' })
  
  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
        ...inputs, 
        [e.target.name]: e.target.value
      })
    )
  }
  
  const classes = useStyles(); 

  const addNewTrip = (e) => {
    e.preventDefault()

    const clientTripData = {
      pickupTime: inputs.pickupTime,
      street: inputs.street,
      city: inputs.city,
      state: inputs.state,
    }

    fetch(`/tripQueue/newtrip`, { 
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      mode: 'cors',
      body: JSON.stringify(clientTripData)
    }
   ).then(response => response.json())
   .then(json => console.log(json))
  }
  
  return (
    <>
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              variant={'h6'}
              color={'textPrimary'}>
              Add New Trip
            </Typography>
            <form 
              className={classes.root} 
              noValidate 
              autoComplete="off"
            >
              <Grid 
                container 
                justify={'flex-start'} 
                alignItems={'center'} 
                spacing={2}
              >
                <AccessAlarmOutlined />
                <Grid item xs={3}>
                <TextField
                  id="userPickupTime"
                  label="Pickup Time"
                  name="pickupTime"
                  type="time"
                  onChange={handleInputChange}
                  defaultValue="05:30"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                </Grid>
                <PlaceOutlined />
                <Grid item xs={6}>
                  <TextField 
                    id="outlined-basic" 
                    name="street"
                    onChange={handleInputChange}
                    label="Street Address" 
                    variant="outlined" 
                    fullWidth 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField 
                    id="outlined-basic"
                    name="city"
                    onChange={handleInputChange}
                    label="City" 
                    variant="outlined" 
                    fullWidth 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField 
                    id="outlined-basic"
                    name="state"
                    onChange={handleInputChange}
                    label="State"
                    variant="outlined" 
                    fullWidth 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  type="submit"
                  onClick={addNewTrip}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </>
  )
}

export default NewTripForm;