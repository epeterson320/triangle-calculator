import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';

describe('<MeasurementInput>', () => {
  it('Should have an input element', () => {
    expect(shallow(<MeasurementInput />).find('input').length).toBe(1);
  });
});
