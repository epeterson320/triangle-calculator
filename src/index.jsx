import React from 'react';
import { hydrate, render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import app from './modules/app';
import { init, pushStateToHistory } from './modules/query';
import App from './App';
import './styles/index.scss';

const store = createStore(app);
store.dispatch(init(window.location));

store.subscribe(() => {
  pushStateToHistory(window)(store.getState());
});

const rootEl = document.getElementById('root');

if (rootEl.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl,
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl,
  );
}
