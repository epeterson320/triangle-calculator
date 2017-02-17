import { combineReducers } from 'redux';
import uiState from './uiState';
import measurements from './measurements';

const app = combineReducers({ uiState, measurements });

export default app;
