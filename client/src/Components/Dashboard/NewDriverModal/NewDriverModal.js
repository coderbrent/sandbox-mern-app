import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input, Container } from '@material-ui/core';
import MessageDisplay from '../MessageDisplay';
import { AddCircle } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

function newDriverReducer(state, action) {
	switch(action.type) {
		case 'loading': {
			return {
				...state,
				isLoading: true
			}
		}
		case 'success': {
			return {
				...state,
				msgType: 'success',
				modalOpen: false,
				isLoading: false,
				msgState: true,
				message: `${state.first_name} was successfully added as a driver!`
			}
		}
		case 'close': {
			return {
				...state,
				modalOpen: false,
				isLoading: false,
				msgState: false,
				message: ''
			}
		}
		case 'open': {
			return {
				...state,
				modalOpen: true,
				isLoading: false,
				msgState: false,
				message: ''
			}
		}
		case 'field': {
			return {
				...state,
				[action.field]: action.value
			}
		}
		case 'error': {
			return {
				...state,
				error: true,
				msgType: 'error',
				msgState: true,
				message: action.payload
			}
		}
		default: return state;
	}

}

const initialState = {
	msgType: '',
	error: false,
	modalOpen: false,
	isLoading: false,
	message: '',
	msgState: false,
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	street: '',
	city: '',
	state: '',
	zipcode: '',
	driverImg: '',
}

export default function FormDialog() {
	const [state, dispatch] = useReducer(newDriverReducer, initialState)
	const { 
		modalOpen, 
		isLoading, 
		message, 
		msgState,
		error,
		msgType,
	} = state

	const addDriver = async e => {
		e.preventDefault()

		dispatch({ type: 'loading' })

		const newDriver = {
			first_name: state.first_name,
			last_name: state.last_name,
			email: state.email,
			phone: state.phone,
			street: state.street,
			city: state.city,
			state: state.state,
			zipcode: state.zipcode,
			image: state.driverImg,
		}

		await fetch(`/drivers/add-driver`, 
			{ 
				method: `POST`,
				headers: {
        	'Content-Type': 'application/json'
      	},
				body: JSON.stringify(newDriver)
			})
			.then(response => {
				if(response.ok) {
					return response.json()
				} else {
					dispatch({ type: error, payload: response.status })
				}
			})
			.then(result => { //maybe change this to a switch to handle a variety of error types?
				if(result.errType === 'DUP_EMAIL') {
					return dispatch({ type: 'error', payload: result.message })
				} else {
					return dispatch({ type: 'success'})
				}
			})
	}

  return (
    <div>
			{ msgState ? <MessageDisplay severityProp={msgType} openState={msgState} message={message} /> : null }
			{ error ? <MessageDisplay severityProp={msgType} openState={msgState} message={message} /> : null }
			<Button 
				variant="contained" 
				color="secondary" 
				onClick={() => dispatch({ type: `open`})}>
        Add Driver <AddCircle />
      </Button>
			<Dialog 
				open={modalOpen} 
				onClose={() => dispatch({ type: `close`})} 
				aria-labelledby="form-dialog-title"
				maxWidth="xl"
			>
			<form>
				<Container maxWidth="sm">
        <DialogTitle id="form-dialog-title">Add Driver</DialogTitle>
        <DialogContent>
          <div style={{ display: `flex`}}>
					<FontAwesomeIcon icon={faUser} />
					<TextField
						autoFocus
						variant="outlined"
            margin="dense"
						id="first_name"
						name="first_name"
            label="First Name"
						type="text"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'first_name', 
								value: e.target.value
							})
						}
						fullWidth
						required={true}
          />
        	<TextField
						autoFocus
						variant="outlined"
						style={{ marginLeft: `2rem`}}
            margin="dense"
						id="last_name"
						name="last_name"
            label="Last Name"
						type="text"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'last_name', 
								value: e.target.value
							})
						}
            fullWidth
          />
					</div>
					<div style={{ display: `flex`}}>
					<TextField
						style={{ marginRight: `2rem`}}
						autoFocus
						variant="outlined"
            margin="normal"
						id="email"
						name="email"
            label="E-Mail"
						type="email"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'email', 
								value: e.target.value
							})
						}
            fullWidth
          />
					<TextField
						autoFocus
						variant="outlined"
            margin="normal"
						name="phone"
						label="Phone Number"
						type="tel"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'phone', 
								value: e.target.value
							})
						}
            fullWidth
          />
					</div>
					<TextField
						variant="outlined"
            autoFocus
            margin="dense"
						id="street"
						name="street"
            label="Street"
						type="text"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'street', 
								value: e.target.value
							})
						}
            fullWidth
          />
					<TextField
						variant="outlined"
            autoFocus
            margin="dense"
						id="city"
						name="city"
						label="City"
						fullWidth
						type="text"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'city', 
								value: e.target.value
							})
						}
          />
					<div style={{ display: `flex`, marginBottom: `1rem`}}>
					<TextField
						variant="outlined"
            autoFocus
            margin="dense"
						id="state"
						name="state"
            label="State"
						type="text"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'state', 
								value: e.target.value
							})
						}
            fullWidth
          />
					<TextField
						variant="outlined"
						style={{ marginLeft: `2rem`}}
            autoFocus
            margin="dense"
						id="zipcode"
						name="zipcode"
            label="Zip Code"
						type="number"
						onChange={e => 
							dispatch({ 
								type: 'field', 
								field: 'zipcode', 
								value: e.target.value
							})
						}
            fullWidth
          />
					</div>
					<Input
						variant="outlined"
						name="image"
						type="file"
						//add onChange handler
					/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch({ type: 'close'})} type="reset" color="primary">
            Cancel
          </Button>
          <Button onClick={addDriver} color="primary">
            Add
					{ isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : null }
          </Button>
        </DialogActions>
				</Container>
				</form>
      </Dialog>
    </div>
  );
}