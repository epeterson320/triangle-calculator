import React from 'react';
import { shallow } from 'enzyme';
import TriangleEasel from './TriangleEasel';

function setup(customProps) {
  const defaultProps = {
    a: { x: 20, y: 100 },
    b: { x: 60, y: 30 },
    c: { x: 100, y: 100 },
    labels: {
      a: { x: 10, y: 108 },
      b: { x: 102, y: 108 },
      c: { x: 54, y: 26 },
      ab: { x: 54, y: 116 },
      ac: { x: 16, y: 68 },
      bc: { x: 84, y: 68 },
    },
    selected: false,
    onClickTriangle: jest.fn(),
    onClickBackground: jest.fn(),
  };

  const props = Object.assign({}, defaultProps, customProps);
  const wrapper = shallow(<TriangleEasel {...props} />);

  return { wrapper, props };
}

const mockEvent = () => ({ stopPropagation: jest.fn() });

describe('<TriangleEasel>', () => {
  it('Should render an svg in a wrapper div', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.viewport svg').length).toBe(1);
  });

  it('Should display three labels for points', () => {
    const { wrapper } = setup();
    expect(wrapper.find('text.pointLabel').length).toBe(3);
  });

  it('Should display three labels for sides', () => {
    const { wrapper } = setup();
    expect(wrapper.find('text.sideLabel').length).toBe(3);
  });

  it('Should display a triangle', () => {
    const { wrapper } = setup();
    expect(wrapper.find('path').hasClass('triangle')).toBe(true);
  });

  it('Should compute the triangle\'s path based on props', () => {
    const { wrapper, props } = setup();
    const { a, b, c } = props;

    expect(wrapper.find('path').props().d)
      .toBe(`M ${a.x},${a.y} L ${b.x},${b.y} L ${c.x},${c.y} Z`);
  });

  it('Should call onClickTriangle when the triangle is clicked', () => {
    const { wrapper, props } = setup();
    const triangle = wrapper.find('.triangle');
    expect(props.onClickTriangle.mock.calls.length).toBe(0);
    triangle.simulate('click', mockEvent());
    expect(props.onClickTriangle.mock.calls.length).toBe(1);
  });

  it('Should call onClickBackground when the SVG is clicked', () => {
    const { wrapper, props } = setup();
    const background = wrapper.find('svg');
    expect(props.onClickBackground.mock.calls.length).toBe(0);
    background.simulate('click');
    expect(props.onClickBackground.mock.calls.length).toBe(1);
  });

  it('Should give the triangle a class when selected', () => {
    const { wrapper } = setup({ selected: true });
    expect(wrapper.find('.triangle').hasClass('selected')).toBe(true);
  });
});
