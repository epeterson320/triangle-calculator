import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

test('Has a root div', (t) => {
  t.ok(shallow(<App />).find('div').hasClass('app'));
  t.end();
});
