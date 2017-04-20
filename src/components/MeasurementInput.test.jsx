import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';

describe('<MeasurementInput>', () => {
  it('Should have an input element', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('input').length)
      .toBe(1);
  });

  it('Should have a label', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('label').text())
      .toBe('ABC');
  });

  it('Should have a "clear" button', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('button').length)
      .toBe(1);
  });
});
