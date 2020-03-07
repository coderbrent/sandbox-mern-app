import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

export default function MessageDisplay({ message, openState, severityProp }) {
  const [state, setState] = useState({
    open: openState,
    vertical: 'top',
    horizontal: 'center',
    severity: severityProp,
  });

  const { vertical, horizontal, open, severity } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
      <Alert severity={severity}> {message} </Alert>
      </Snackbar>
    </div>
  );
}
