import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput, { METRIC } from './MeasurementInput';

describe('<MeasurementInput>', () => {
  it('Should have an input element', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('input').length).toBe(1);
  });

  it('Should have a label', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('label').text()).toBe('ABC');
  });

  it('Should match the label\'s "for" to the input\'s "id"', () => {
    const el = shallow(<MeasurementInput label="ABC" />);
    expect(el.find('label').prop('htmlFor')).toBe(el.find('input').prop('id'));
  });

  it('Should accept an "onChange" property', () => {
    const el = shallow(<MeasurementInput label="ABC" onChange={() => {}} />);
    expect(el.find('input').prop('onChange')).toBeDefined();
  });

  it('Should accept a "metric" property', () => {
    const el = shallow(<MeasurementInput label="ABC" metric={METRIC.DEG} />);
    expect(el.instance().props.metric).toBeDefined();
  });

  it.skip('Should not call onChange immediately when content is changed');
  it.skip('Should call onChange, delayed, after a change');
  it.skip('Should delay/debounce the call to onChange if subsequent changes are made');

  it('Should have a "clear" button', () => {
    expect(shallow(<MeasurementInput label="ABC" />).find('button').length).toBe(1);
  });

  it.skip('Should not show the "clear" button if the input is empty');
  it.skip('Should accept a "computed" property');
  it.skip('Should disable input if the value is computed');
  it.skip('Should not show the "clear" button if the value is computed');
  it.skip('Should call "onClear" when the clear button is clicked');
});
