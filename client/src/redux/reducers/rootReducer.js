import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import trips from './trips'

export default combineReducers({ trips, visibilityFilter })