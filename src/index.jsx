import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import app from './modules/app';
import { init, pushStateToHistory } from './modules/query';
import App from './App';
import './styles/index.scss';

const store = createStore(app);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl,
);

store.dispatch(init(window.location));

store.subscribe(() => {
  pushStateToHistory(window)(store.getState());
});
