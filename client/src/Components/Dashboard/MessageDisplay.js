import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

export default function MessageDisplay({ message, openState }) {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: ''
  });

  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={openState}
        autoHideDuration={6000}
        // onClick={handleClose}
      >
      <Alert onClick={handleClose}> {message} </Alert>
      </Snackbar>
    </div>
  );
}
