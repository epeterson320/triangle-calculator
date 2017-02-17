/**
 * This is the root reducer for the application. Files in this folder
 * conform to the redux "ducks" convention.
 *
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from 'redux';
import uiState from './uiState';
import measurements from './measurements';

const app = combineReducers({ uiState, measurements });

export default app;
