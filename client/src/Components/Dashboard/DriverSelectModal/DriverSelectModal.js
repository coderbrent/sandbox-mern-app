import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const [drivers, setDrivers] = useState([])
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const getDriversFromServer = async () => {
    await fetch(`/drivers/all-drivers`)
      .then(response => response.json())
      .then(drivers => setDrivers(drivers))
  }

  const assignDriver = (tripId, driverId) => { 
    fetch(`/trips/assign-driver/${tripId}/${driverId}`, { method: `PUT`})
  }

  useEffect(() => {
    getDriversFromServer();
  }, [])

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (name, driverId) => {
    onClose(name);
    assignDriver(props.tripId, driverId)
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Assign A Driver</DialogTitle>
      <List>
        {drivers.map(driver => (
          <ListItem button onClick={() => handleListItemClick(driver.first_name, driver._id)} key={driver._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar} src={driver.image}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={driver.email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addDriverFunction')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add New Driver" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function DriverSelectModal({ tripId }) {
  const [open, setOpen] = React.useState(false);
  const [selectedDriver, setSelectedDriver] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Assigned Driver: {selectedValue}
      </Typography>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleClickOpen}
      >
        Assign A Driver
      </Button>
      <SimpleDialog 
        selectedValue={selectedDriver} 
        open={open} 
        onClose={handleClose}
        tripId={tripId}
      />
    </div>
  );
}