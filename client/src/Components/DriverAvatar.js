import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: `flex`,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function DriverAvatar({ driver, driverImage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={driver} src={driverImage} />
    </div>
  )
}