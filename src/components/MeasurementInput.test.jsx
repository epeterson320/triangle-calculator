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

  it('Should match the label\'s "for" to the input\'s "id"');

  it('Should have a "clear" button', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('button').length)
      .toBe(1);
  });

  it('Should accept an "onChange" property');
  it('Should not call onChange immediately');
  it('Should call onChange 300ms after a change');
  it('Should delay/debounce the call to onChange if subsequent changes are made');
  it('Should not show the "clear" button if the input is empty');

  it('Should accept a "computed" property');
  it('Should disable input if the value is computed');
  it('Should not show the "clear" button if the value is computed');
  it('Should call "onClear" when the clear button is clicked');
});
