import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import vehicleinfo from '../vehicleinfo.json'
import { 
  MenuItem,
  Select,
} from '@material-ui/core'

export default function NewTripModal() {
  const [open, setOpen] = useState(false)
  const [availableModels, setAvailableModels] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState({ year: '', make: '', model: '' })
   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewVehicle = e => {
    e.preventDefault()

    const newVehicle = {
      make: selectedVehicle.make,
      year: selectedVehicle.year,
      model: selectedVehicle.model
    }

    fetch(`/vehicles/add-vehicle`, { 
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newVehicle)
    }
   ).then(response => response.json())
   .then(json => console.log(json))

   handleClickOpen();
  }

  const vehicleSelector = make => {
    switch(make) {
      case 'Ford': return setAvailableModels(vehicleinfo.models.Ford)
      case 'Lincoln': return setAvailableModels(vehicleinfo.models.Lincoln)
      case 'Cadillac': return setAvailableModels(vehicleinfo.models.Cadillac)
    }
  }

  const handleChange = e => {
    setSelectedVehicle({...selectedVehicle, [e.target.name]: e.target.value })
    vehicleSelector(e.target.value)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Vehicle
      </Button>
      <Dialog 
        maxWidth="xl" 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add A New Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add A New Vehicle
          </DialogContentText>
            <Select
              name="year"
              label="Years"
              id="year-select"
              onChange={e => setSelectedVehicle({ ...selectedVehicle, [e.target.name]: e.target.value })}
              value={selectedVehicle.year}
              required
            >
            { vehicleinfo.years.map((year, i) => (
            <MenuItem 
              value={year}
              key={i}
            >
              {year}
            </MenuItem> 
          ))}
          </Select>
          <Select
              name="make"
              label="Make"
              id="make-select"
              onChange={handleChange}
              value={selectedVehicle.make}
              required
            >
            { vehicleinfo.makes.map((make, i) => (
            <MenuItem 
              value={make}
              key={i}
            >
              {make}
            </MenuItem> 
          ))}
          </Select>
          <Select
            name="model"
            label="Model"
            id="model-select"
            onChange={e => setSelectedVehicle({ ...selectedVehicle, [e.target.name]: e.target.value })}
            value={selectedVehicle.model}
            required
          >
            { availableModels.map((model, i) => (
            <MenuItem 
              value={model}
              key={i}
            >
              {model}
            </MenuItem> 
          ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={addNewVehicle} color="primary">
            Add Vehicle
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
