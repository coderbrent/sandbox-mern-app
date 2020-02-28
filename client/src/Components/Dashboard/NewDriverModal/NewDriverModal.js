import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input, Avatar } from '@material-ui/core';
import MessageDisplay from '../MessageDisplay'
import PropTypes from 'prop-types'

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
	const [driverImg, setDriverImg] = useState({ image: '', loaded: 0 })

	const changeHandler = e => {
		console.log(URL.createObjectURL(e.target.files[0]))
		setDriverImg({ image: URL.createObjectURL(e.target.files[0]).replace(/blob:/, '') })
	}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	};

	const addDriver = e => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('first_name', formInputs.first_name)
		formData.append('last_name', formInputs.last_name)
		formData.append('email', formInputs.email)
		formData.append('phone', formInputs.phone)
		formData.append('street', formInputs.street)
		formData.append('city', formInputs.city)
		formData.append('state', formInputs.state)
		formData.append('zipcode', formInputs.zipcode)
		formData.append('image', driverImg.image)

		// const newDriver = {
		// 	first_name: formInputs.first_name,
		// 	last_name: formInputs.last_name,
		// 	email: formInputs.email,
		// 	phone: formInputs.phone,
		// 	street: formInputs.street,
		// 	city: formInputs.city,
		// 	state: formInputs.state,
		// 	zipcode: formInputs.zipcode,
		// 	image: imgData,
		// }

		fetch(`/drivers/add-driver`, 
			{ 
				method: `POST`,
				headers: {
        	'Content-Type': 'multipart/form-data'
      	},
				body: formData
			})
			.then(response => { 
				if(response.ok) {
					setMessage(`Driver was successfully added!`)
				} else {
					setMessage(`Driver was not set due to an error.`)
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
        Add Driver
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form>
        <DialogTitle id="form-dialog-title">Add Driver</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
						id="first_name"
						name="first_name"
            label="First Name"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
        	<TextField
            autoFocus
            margin="dense"
						id="last_name"
						name="last_name"
            label="Last Name"
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					<TextField
            autoFocus
            margin="dense"
						id="email"
						name="email"
            label="E-Mail"
						type="email"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					<TextField
            autoFocus
            margin="dense"
						id="phone"
						name="phone"
            label="Phone Number"
						type="tel"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
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
						type="text"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
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
            autoFocus
            margin="dense"
						id="zipcode"
						name="zipcode"
            label="Zip Code"
						type="number"
						onChange={e => setFormInputs({...formInputs, [e.target.name]: e.target.value})}
            fullWidth
          />
					
					<Input 
						name="image"
						type="file"
						onChange={changeHandler}
					/>
					<Avatar src={ driverImg.image ? driverImg.image.name : 'https://i.pravatar.cc/150?img=2' } /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="reset" color="primary">
            Cancel
          </Button>
          <Button onClick={addDriver} color="primary">
            Add
          </Button>
        </DialogActions>
				</form>
      </Dialog>
    </div>
  );
}