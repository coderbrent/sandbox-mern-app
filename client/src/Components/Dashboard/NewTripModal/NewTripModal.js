import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import GoogleAutoComplete from '../GoogleAutoComplete/GoogleAutoComplete';
import { DateRangeTwoTone, MapTwoTone } from '@material-ui/icons';

export default function NewTripModal() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedType, setSelectedType] = useState('')
  const [inputs, setInputs] = useState({ pu_time: '', pu_addr: '' })
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const addNewTrip = e => {
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

   handleClickOpen();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Trip
      </Button>
      <Dialog 
        fullWidth 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter A New Trip</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use this form to create a new trip!
          </DialogContentText>
          <div 
            style={{ 
              display: `inline-flex`, 
              alignItems: `center`,
              justifyContent: `space-evenly`
            }}
          >
            <DateRangeTwoTone />
            <DatePicker 
              name="pu_date" 
              value={selectedDate}
              onChange={setSelectedDate}
              autoOk={true}
              disablePast={true}
              required
            />
          </div>
          <div 
            style={{ 
              display : `inline-flex`, 
              alignItems: `center`, 
              justifyContent: `space-evenly`
            }}
          >
          <MapTwoTone />
          <TextField
            id="userPickupTime"
            label="Pickup Time"
            name="pu_time"
            type="time"
            onChange={handleInputChange}
            defaultValue="05:30"
            inputProps={{
              step: 300, // 5 min intervals
            }}
            required
          />
          </div>
           <InputLabel 
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
              required
            >
            <MenuItem value={'Airport'}>Airport</MenuItem>
            <MenuItem value={'Local'}>Local</MenuItem>
            <MenuItem value={'NYC'}>NYC</MenuItem>
          </Select>
          <div 
            style={{ 
              width: `100%`
            }}
          >
            <GoogleAutoComplete />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewTrip} color="primary">
            Create Trip
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
