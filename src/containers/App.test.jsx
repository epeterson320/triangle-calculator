import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App>', () => {
  it('Should have a root div', () => {
    expect(shallow(<App />).find('div').hasClass('app')).toBe(true);
  });
});
