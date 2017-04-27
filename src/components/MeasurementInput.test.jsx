import React from 'react';
import { shallow } from 'enzyme';
import MeasurementInput from './MeasurementInput';

jest.useFakeTimers();

function render(props) {
  const defaults = { label: 'ABC' };
  const merged = Object.assign({}, defaults, props);
  return shallow(<MeasurementInput {...merged} />);
}

describe('<MeasurementInput>', () => {
  it('Should have an input element', () => {
    expect(render().find('input')).toHaveLength(1);
  });

  it('Should have a label', () => {
    expect(render().find('label').text()).toBe('ABC');
  });

  it('Should match the label\'s "for" to the input\'s "id"', () => {
    const el = render();
    expect(el.find('label').prop('htmlFor'))
      .toBe(el.find('input').prop('id'));
  });

  it('Should accept a "metric" property', () => {
    const el = render();
    expect(el.instance().props.metric).toBeDefined();
  });

  describe('onChange', () => {
    it('Should accept an "onChange" property', () => {
      const el = render();
      expect(el.instance().props.onChange).toBeDefined();
    });

    it('Should not call onChange immediately when content is changed', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn });
      el.find('input').simulate('change', { target: { value: '3' } });
      expect(fn).not.toBeCalled();
    });

    it('Should call onChange, delayed, after a change', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn });
      el.find('input').simulate('change', { target: { value: '3' } });
      jest.runAllTimers();
      expect(fn).toBeCalled();
    });

    it('Should delay/debounce the call to onChange if subsequent changes are made', () => {
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
    it('Should have a "clear" button', () => {
      expect(render().find('button')).toHaveLength(1);
    });

    it('Should not show the "clear" button if the input is empty', () => {
      expect(render().find('button').hasClass('hidden')).toBe(true);
    });

    it('Should show the "clear" button when text is typed', () => {
      const el = render();
      el.find('input').simulate('change', { target: { value: '3' } });
      expect(el.find('button').hasClass('hidden')).toBe(false);
    });

    it('Should call "onClear" when the clear button is clicked', () => {
      const fn = jest.fn();
      const el = render({ onClear: fn });
      el.find('button').simulate('click');
      expect(fn).toBeCalled();
    });

    it('Should call "onClear", not "onChange" when the text is deleted', () => {
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
    it('Should have a "computedVal" property', () => {
      expect(render().instance().props.computedVal).toBeDefined();
    });

    it('Should show the computed value in the input', () => {
      expect(render({ computedVal: 42 }).find('input').prop('value')).toBe('42');
    });

    it('Should disable input if the value is computed', () => {
      const fn = jest.fn();
      const el = render({ onChange: fn, computedVal: 14.523 });
      el.find('input').simulate('change', { target: { value: '3' } });
      jest.runAllTimers();
      expect(fn).not.toBeCalled();
      expect(el.find('input').prop('value')).toBe('14.523');
    });

    it('Should not show the "clear" button if the value is computed', () => {
      expect(render({ computedVal: 4 }).find('button').hasClass('hidden')).toBe(true);
    });
  });
});
