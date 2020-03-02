import React, { useState } from 'react'
import { TextField, Container, Button, ButtonGroup, FormHelperText, FormControl } from '@material-ui/core'

const Drivers = () => {
  const [inputs, setInputs] = useState({ first_name: ''})
 
  return (
    <>
    <Container maxWidth="sm">
    <div>
      <FormControl margin="normal" style={{ marginRight: `1rem`}}>
        <TextField 
          required
          name="first_name"
          label="First Name"
          variant="outlined"
          onChange={e => setInputs({...inputs, [e.target.name]: e.target.value })}
        />
      </FormControl>
      <FormControl margin="normal">
        <TextField 
          required
          name="last_name"
          label="Last Name"
          variant="outlined"
          onChange={e => setInputs({...inputs, [e.target.name]: e.target.value })}
        />
      </FormControl>
      <FormControl margin="normal">
        <TextField 
          type="tel"
          name="phone"
          label="Phone"
          variant="outlined"
          onChange={e => setInputs({...inputs, [e.target.name]: e.target.value })}
        />
        <FormHelperText id="my-helper-text">We'll never share your phone number.</FormHelperText>
      </FormControl>
    </div>
      <ButtonGroup>
        <Button 
          variant="contained"
          color="primary"
        >
          Add Driver  
        </Button>
      </ButtonGroup>
    </Container>
    </>
  )
}

export default Drivers;