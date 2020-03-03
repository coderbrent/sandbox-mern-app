import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input, Container } from '@material-ui/core';
import MessageDisplay from '../MessageDisplay'
import { Add } from '@material-ui/icons';

export default function FormDialog() {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [msgState, setMsgState] = useState(false)
	const [formInputs, setFormInputs] = 
		useState({ 
			first_name: '',
			last_name: '',
			email: '',
			phone: '',
			street: '',
			city: '',
			state: '',
			zipcode: '',
		})
	const [driverImg, setDriverImg] = useState({ image: null, loaded: 0 })

	const changeHandler = e => {
		console.log(URL.createObjectURL(e.target.files[0]))
		setDriverImg({ ...driverImg, image: URL.createObjectURL(e.target.files[0]).replace(/blob:/, '') })
	}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};

	const addDriver = e => {
		e.preventDefault()

		const newDriver = {
			first_name: formInputs.first_name,
			last_name: formInputs.last_name,
			email: formInputs.email,
			phone: formInputs.phone,
			street: formInputs.street,
			city: formInputs.city,
			state: formInputs.state,
			zipcode: formInputs.zipcode,
			image: `/brentphoto.png`,
		}

		fetch(`/drivers/add-driver`, 
			{ 
				method: `POST`,
				headers: {
        	'Content-Type': 'application/json'
      	},
				body: JSON.stringify(newDriver)
			})
			.then(response => { 
				if(response.ok) {
					setMessage(`Driver ${formInputs.first_name} ${formInputs.last_name} was successfully added!`)
				} else {
					setMessage(`Driver was not added due to an error.`)
				}
			})
			.then(result => {
				setMsgState(true)
				return result
			})
			handleClose();
	}

  return (
    <div>
			{ msgState ? <MessageDisplay openState={msgState} message={message} /> : null }
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Driver <Add />
      </Button>
			<Dialog 
				open={open} 
				onClose={handleClose} 
				aria-labelledby="form-dialog-title"
				maxWidth="xl"
			>
				<form>
				<Container maxWidth="sm">
        <DialogTitle id="form-dialog-title">Add Driver</DialogTitle>
        <DialogContent>
          <div style={{ display: `flex`}}>
					<TextField
            autoFocus
            margin="dense"
						id="first_name"
						name="first_name"
            label="First Name"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
						fullWidth
						required={true}
          />
        	<TextField
						autoFocus
						style={{ marginLeft: `2rem`}}
            margin="dense"
						id="last_name"
						name="last_name"
            label="Last Name"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					</div>
					<div style={{ display: `flex`}}>
					<TextField
						style={{ marginRight: `2rem`}}
            autoFocus
            margin="normal"
						id="email"
						name="email"
            label="E-Mail"
						type="email"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					<TextField
            autoFocus
            margin="normal"
						name="phone"
						label="Phone Number"
						type="tel"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					</div>
					<TextField
            autoFocus
            margin="dense"
						id="street"
						name="street"
            label="Street"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					<TextField
            autoFocus
            margin="dense"
						id="city"
						name="city"
						label="City"
						fullWidth
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
          />
					<div style={{ display: `flex`, marginBottom: `1rem`}}>
					<TextField
            autoFocus
            margin="dense"
						id="state"
						name="state"
            label="State"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					<TextField
						style={{ marginLeft: `2rem`}}
            autoFocus
            margin="dense"
						id="zipcode"
						name="zipcode"
            label="Zip Code"
						type="number"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					</div>
					<Input 
						name="image"
						type="file"
						onChange={changeHandler}
					/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="reset" color="primary">
            Cancel
          </Button>
          <Button onClick={addDriver} color="primary">
            Add
          </Button>
        </DialogActions>
				</Container>
				</form>
      </Dialog>
    </div>
  );
}