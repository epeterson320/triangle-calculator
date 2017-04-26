import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

test('Has a root div', (t) => {
  t.equal(shallow(<App />).find('div.app').length, 1);
  t.end();
});
