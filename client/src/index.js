import React from 'react'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers/rootReducer'
import ReactDOM from 'react-dom'
import App from './App'

const loggerMiddleware = createLogger()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

