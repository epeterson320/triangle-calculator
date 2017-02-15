import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import TriangleEditor from '../containers/TriangleEditor';

describe('<App>', () => {
  it('Should have a root div', () => {
    expect(shallow(<App />).find('div').hasClass('app')).toBe(true);
  });

  it('Should contain a <TriangleEditor />', () => {
    expect(shallow(<App />).contains(<TriangleEditor />)).toBe(true);
  });
});
