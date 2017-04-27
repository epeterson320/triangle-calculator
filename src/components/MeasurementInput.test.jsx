import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';
import { DEG, RAD } from '../geometry/Metric';

const { PI } = Math;

jest.useFakeTimers();

function render(props) {
  const defaults = { label: 'ABC' };
  const merged = Object.assign({}, defaults, props);
  return shallow(<MeasurementInput {...merged} />);
}

describe('<MeasurementInput>', () => {
  it('Has an input element', () => {
    expect(render().find('input')).toHaveLength(1);
  });

  it('Has a label', () => {
    expect(render().find('label').text()).toBe('ABC');
  });

  it('Matches the label\'s "for" to the input\'s "id"', () => {
    const el = render();
    expect(el.find('label').prop('htmlFor'))
      .toBe(el.find('input').prop('id'));
  });

  describe('onChange', () => {
    it('Has an "onChange" property', () => {
      const el = render();
      expect(el.instance().props.onChange).toBeDefined();
    });

    it('Does not call onChange immediately when content is changed', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn });
      el.find('input').simulate('change', { target: { value: '3' } });
      expect(fn).not.toBeCalled();
    });

    it('Calls onChange, delayed, after a change', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn });
      el.find('input').simulate('change', { target: { value: '3' } });
      jest.runAllTimers();
      expect(fn).toBeCalled();
    });

    it('Debounces the call to onChange if subsequent changes are made', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn });
      el.find('input').simulate('change', { target: { value: '3' } });
      el.find('input').simulate('change', { target: { value: '3.' } });
      el.find('input').simulate('change', { target: { value: '3.5' } });
      jest.runAllTimers();
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Clear', () => {
    it('Has a "clear" button', () => {
      expect(render().find('button')).toHaveLength(1);
    });

    it('Hides the "clear" button if the input is empty', () => {
      expect(render().find('button').hasClass('hidden')).toBe(true);
    });

    it('Shows the "clear" button when text is typed', () => {
      const el = render();
      el.find('input').simulate('change', { target: { value: '3' } });
      expect(el.find('button').hasClass('hidden')).toBe(false);
    });

    it('Calls "onClear" when the clear button is clicked', () => {
      const fn = jest.fn();
      const el = render({ onClear: fn });
      el.find('button').simulate('click');
      expect(fn).toBeCalled();
    });

    it('Calls "onClear", not "onChange" when the text is deleted', () => {
      const onChange = jest.fn();
      const onClear = jest.fn();
      const el = render({ onChange, onClear });
      el.find('input').simulate('change', { target: { value: '' } });
      jest.runAllTimers();
      expect(onClear).toBeCalled();
      expect(onChange).not.toBeCalled();
    });
  });

  describe('ComputedVal', () => {
    it('Has a "computedVal" property', () => {
      expect(render().instance().props.computedVal).toBeDefined();
    });

    it('Shows the computed value in the input', () => {
      expect(render({ computedVal: 42 }).find('input').prop('value')).toBe('42');
    });

    it('Styles the input differently', () => {
      expect(render({ computedVal: 42 }).find('.computed').length).toBeGreaterThan(0);
    });

    it('Disables input if the value is computed', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn, computedVal: 14.523 });
      el.find('input').simulate('change', { target: { value: '3' } });
      jest.runAllTimers();
      expect(fn).not.toBeCalled();
      expect(el.find('input').prop('value')).toBe('14.523');
    });

    it('Hides the "clear" button if the value is computed', () => {
      expect(render({ computedVal: 4 }).find('button').hasClass('hidden')).toBe(true);
    });

    it('Clears the input if it loses the "computedVal" prop', () => {
      const el = render({ computedVal: 14.523 });
      expect(el.find('input').prop('value')).toBe('14.523');

      el.setProps({ computedVal: undefined });
      expect(el.find('input').prop('value')).toBe('');
    });
  });

  describe('Metrics', () => {
    it('Has a "metric" property', () => {
      const el = render();
      expect(el.instance().props.metric).toBeDefined();
    });

    it('Updates the input when converting from radians to degrees', () => {
      const el = render({ metric: RAD });
      el.find('input').simulate(
        'change',
        { target: { value: (PI / 3).toString() } },
      );
      jest.runAllTimers();
      el.setProps({ metric: DEG });
      const newText = el.find('input').prop('value');
      expect(parseFloat(newText)).toBeCloseTo(60);
    });

    it('Updates the input when converting from deg to rad', () => {
      const el = render({ metric: DEG });
      el.find('input').simulate(
        'change',
        { target: { value: '60' } },
      );
      jest.runAllTimers();
      el.setProps({ metric: RAD });
      const newText = el.find('input').prop('value');
      expect(parseFloat(newText)).toBeCloseTo(PI / 3);
    });

    it('Calls onChange with radians when showing degrees or radians', () => {
      const onChange = jest.fn();
      const el = render({ metric: DEG, onChange });
      el.find('input').simulate('change', { target: { value: '60' } });
      jest.runAllTimers();
      expect(onChange).toHaveBeenCalledWith(60 * 2 * PI / 360);
    });
  });
});
