import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('Has an input element', () => {
    expect(shallow(<Checkbox />).find('input[type="checkbox"]')).toHaveLength(
      1,
    );
  });

  it('Calls an onChange handler with its value when toggled', () => {
    const onChange = jest.fn();
    const el = shallow(<Checkbox onChange={onChange} />);
    el.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith(true);
  });

  it('Works without an onChange handler', () => {
    const el = shallow(<Checkbox />);
    el.find('input').simulate('change', { target: { checked: true } });
    // Should not throw
  });

  it('Has a label', () => {
    const el = shallow(<Checkbox label="Foo" />);
    expect(el.find('label').text()).toBe('Foo');
  });
});
