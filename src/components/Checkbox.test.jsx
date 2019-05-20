import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

function render(props = {}) {
  const defaults = {};
  const merged = Object.assign({}, defaults, props);
  return shallow(<Checkbox {...merged} />);
}

describe('<Checkbox />', () => {
  it('Has an input element', () => {
    expect(render().find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('Calls an onChange handler with its value when toggled', () => {
    const onChange = jest.fn();
    const el = render({ onChange });
    el.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toBeCalledWith(true);
  });

  it('Works without an onChange handler', () => {
    const el = render();
    el.find('input').simulate('change', { target: { checked: true } });
    // Should not throw
  });

  it('Has a label', () => {
    const el = render({ label: 'Foo' });
    expect(el.find('label').text()).toBe('Foo');
  });
});
