import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import Component, { DisplayPrefsForm } from './DisplayPrefsForm';
import app from '../modules/app';

function getStore() {
  return createStore(app);
}

describe('<DisplayPrefsForm />', () => {
  it('Renders without error', () => {
    shallow(<DisplayPrefsForm />);
  });

  it('Connects to redux without error', () => {
    const store = getStore();
    shallow(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
  });
});
