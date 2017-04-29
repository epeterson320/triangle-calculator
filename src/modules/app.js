/**
 * This is the root reducer for the application. Files in this folder
 * conform to the redux "ducks" convention.
 *
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from 'redux'
import measurements from './measurements'
import display from './display'

export default combineReducers({
  measurements,
  display
})
