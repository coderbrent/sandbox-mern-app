import React from 'react';
import GoogleAutoComplete from '../Dashboard/GoogleAutoComplete'
import GoogleMap from './GoogleMap/GoogleMap';
import { Button } from '@material-ui/core';

const ClientTrip = () => {
  return (
    <>
      <div>
        <GoogleMap />
        
        <form>
        <h1>Reserve Here</h1>
        <GoogleAutoComplete />
        <Button></Button>
        </form>
      </div>
    </>
  )
}

export default ClientTrip;