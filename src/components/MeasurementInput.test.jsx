import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';

test('Should have an input element', (t) => {
  t.equal(shallow(<MeasurementInput label="ABC" />).find('input').length, 1);
  t.end();
});

test('Should have a label', (t) => {
  t.equal(shallow(<MeasurementInput label="ABC" />).find('label').text(), 'ABC');
  t.end();
});

test('Should match the label\'s "for" to the input\'s "id"', (t) => {
  const el = shallow(<MeasurementInput label="ABC" />);
  t.equal(el.find('label').prop('htmlFor'), el.find('input').prop('id'));
  t.end();
});

test('Should accept an "onChange" property', (t) => {
  const el = shallow(<MeasurementInput label="ABC" onChange={() => {}} />);
  t.ok(el.find('input').prop('onChange'));
  t.end();
});

test.skip('Should not call onChange immediately when content is changed');
test.skip('Should call onChange, delayed, after a change');
test.skip('Should delay/debounce the call to onChange if subsequent changes are made');

test('Should have a "clear" button', (t) => {
  t.equal(shallow(<MeasurementInput label="ABC" />).find('button').length, 1);
  t.end();
});

test.skip('Should not show the "clear" button if the input is empty');
test.skip('Should accept a "computed" property');
test.skip('Should disable input if the value is computed');
test.skip('Should not show the "clear" button if the value is computed');
test.skip('Should call "onClear" when the clear button is clicked');
