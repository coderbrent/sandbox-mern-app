import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  MenuItem,
  Select,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

export default function NewTripModal() {
  const [vehicleList, setVehicleList] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
 
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   paper: {
  //     padding: theme.spacing(4),
  //     textAlign: 'left',
  //     color: theme.palette.text.primary,
  //     width: `3rem`
  //   },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  // }));
  
  // const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = e => {
    setSelectedType(e.target.value);
  }

  const addNewVehicle = e => {
    e.preventDefault()

    const newVehicle = {
      make: 'Ford'
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

  useEffect(() => {
    const getVehicleList = async () => {
      await fetch(`/vehicles/vehicle-list`)
        .then(response => response.json())
        .then(data => {
          setVehicleList(data)
        })
    }
    getVehicleList();
  },[])

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Vehicle
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add A New Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add A New Vehicle
          </DialogContentText>
            <Select
              name="vehicle-make"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // onChange={handleSelect}
              value={selectedType}
              required
            >
              { vehicleList.map((make, i) => (
                <MenuItem 
                  key={i}
                  value={i}
                  >
                  { make.makes[i] }
                </MenuItem>
              )) }
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
