import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';

jest.useFakeTimers();

describe('<MeasurementInput>', () => {
  describe('Input', () => {
    it('Should have an input element', () => {
      expect(shallow(<MeasurementInput label="ABC" />).find('input').length)
        .toBe(1);
    });

    it('Should have a label', () => {
      expect(shallow(<MeasurementInput label="ABC" />).find('label').text())
        .toBe('ABC');
    });

    it('Should match the label\'s "for" to the input\'s "id"', () => {
      const el = shallow(<MeasurementInput label="ABC" />);
      expect(el.find('label').prop('htmlFor'))
        .toBe(el.find('input').prop('id'));
    });
  });

  describe('onChange', () => {
    it('Should accept an "onChange" property', () => {
      const el = shallow(<MeasurementInput label="ABC" onChange={jest.fn()} />);
      expect(el.find('input').prop('onChange')).toBeDefined();
    });
    it('Should not call onChange immediately when content is changed');
    it('Should call onChange, delayed, after a change');
    it('Should delay/debounce the call to onChange if subsequent changes are made');
  });

  describe('Clear', () => {
    it('Should have a "clear" button', () => {
      expect(shallow(<MeasurementInput label="ABC" />).find('button').length)
        .toBe(1);
    });

    it('Should not show the "clear" button if the input is empty');
    it('Should accept a "computed" property');
    it('Should disable input if the value is computed');
    it('Should not show the "clear" button if the value is computed');
    it('Should call "onClear" when the clear button is clicked');
  });
});
