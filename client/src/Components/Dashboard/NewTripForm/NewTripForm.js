import React, { useState, useRef, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NewTripForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedType, setSelectedType] = useState('')
  const [inputs, setInputs] = useState({ pu_time: '', pu_addr: '' })
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const classes = useStyles(); 

  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({
        ...inputs, 
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSelect = e => {
    setSelectedType(e.target.value);
  }

  const addNewTrip = (e) => {
    e.preventDefault()

    const newTrip = {
      trip_type: selectedType,
      pu_date: selectedDate,
      pu_time: inputs.pu_time,
      pu_addr: inputs.pu_addr,
    }

    fetch(`/trips/add-trip`, { 
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newTrip)
    }
   ).then(response => response.json())
   .then(json => console.log(json))
  }
  
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
                  name="pu_time"
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
                  required
                />
                </Grid>
                <FormControl 
                  variant="outlined" 
                  className={classes.formControl}
                >
                  <InputLabel 
                    ref={inputLabel} 
                    id="demo-simple-select-outlined-label"
                  >
                    Trip Type
                  </InputLabel>
                  <Select
                    name="trip_type"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={handleSelect}
                    value={selectedType}
                    labelWidth={labelWidth}
                    required
                  >
                    <MenuItem value={'Airport'}>Airport</MenuItem>
                    <MenuItem value={'Local'}>Local</MenuItem>
                    <MenuItem value={'NYC'}>NYC</MenuItem>
                  </Select>
                </FormControl>
                <DatePicker 
                  name="pu_date" 
                  value={selectedDate}
                  onChange={setSelectedDate}
                  required
                />
                <Grid item xs={6}>
                  <TextField 
                    id="outlined-basic"
                    name="pu_addr"
                    onChange={handleInputChange}
                    label="Address" 
                    variant="outlined"
                    fullWidth 
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  type="submit"
                  onClick={addNewTrip}
                  style={{ margin: `.25em`}}
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