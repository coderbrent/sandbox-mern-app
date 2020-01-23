import React from 'react';
import { Container, Box, Grid, Paper, Typography, Input, TextField, Icon} from '@material-ui/core'
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
  const classes = useStyles();
 
  return (
    <>
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography
              variant={'h6'}
              color={'textPrimary'}>
              Add New Trip
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container justify={'flex-start'} alignItems={'center'} spacing={3}>
                <AccessAlarmOutlined />
                <Grid item xs={3}>
                <TextField
                  id="userPickupTime"
                  label="Pickup Time"
                  type="time"
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
                    label="Your Address" 
                    variant="outlined" 
                    fullWidth 
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
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