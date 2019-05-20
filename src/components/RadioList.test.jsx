import React from 'react';
import { shallow } from 'enzyme';
import RadioList from './RadioList';

function render(props) {
  const defaults = {
    opts: [
      { label: 'Option 1', value: 1, default: true },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 },
    ],
  };
  const merged = Object.assign({}, defaults, props);
  return shallow(<RadioList {...merged} />);
}

describe('<RadioList />', () => {
  it('has an input element type radio for each option', () => {
    expect(render().find('input[type="radio"]').length).toBe(3);
  });

  it('input elements have the same name attribute', () => {
    const el = render();
    const name1 = el
      .find('input')
      .first()
      .prop('name');
    el.find('input').forEach(node => {
      expect(node.prop('name')).toBe(name1);
    });
  });

  it('has a label for each input', () => {
    expect(render().find('label').length).toBe(3);
  });

  it('checks the option with "default"', () => {
    expect(
      render()
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(true);
  });

  it('switches to a different option when clicked', () => {
    const el = render();
    el.find('input')
      .at(1)
      .simulate('change', { target: { value: 2 } });
    expect(
      el
        .find('input')
        .first()
        .prop('checked'),
    ).toBe(false);
    expect(
      el
        .find('input')
        .at(1)
        .prop('checked'),
    ).toBe(true);
  });

  it('Has an onChange property', () => {
    expect(render().instance().props.onChange).toBeDefined();
  });

  it('Calls onChange with the values when selected', () => {
    const onChange = jest.fn();
    const el = render({ onChange });

    el.find('input')
      .at(1)
      .simulate('change', { target: { value: 2 } });
    expect(onChange).toHaveBeenCalledWith(2);
    el.find('input')
      .at(0)
      .simulate('change', { target: { value: 1 } });
    expect(onChange).toHaveBeenCalledWith(1);
    el.find('input')
      .at(2)
      .simulate('change', { target: { value: 3 } });
    expect(onChange).toHaveBeenCalledWith(3);

    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
