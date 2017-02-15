import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import calculator from './modules/calculator';
import './index.css';
import App from './components/App';

// eslint-disable-next-line no-underscore-dangle
const devExt = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtools = devExt && devExt();
const store = createStore(calculator, devtools);
const rootEl = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) module.hot.accept('./components/App', () => { render(App); });
