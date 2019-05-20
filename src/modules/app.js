import { combineReducers } from 'redux';
import input from './input';
import display from './display';
import labels from './labels';

export default combineReducers({ input, display, labels });
