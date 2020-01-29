import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import tripReducer from './reducers/tripReducer'

const middleware = [thunk];

const initialState = {
  thing: 'ehy'
}

const store = createStore(tripReducer, initialState, compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;