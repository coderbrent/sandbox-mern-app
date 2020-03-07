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
import { AccessAlarmOutlined } from '@material-ui/icons'

const NewTripForm = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedType, setSelectedType] = useState('')
  const [inputs, setInputs] = useState({ pu_time: '', pu_addr: '' })
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

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
    <div>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Paper>
            <Typography
              variant={'h6'}
              color={'textPrimary'}>
              Add New Trip
            </Typography>
            <form 
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