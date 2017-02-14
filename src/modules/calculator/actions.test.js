import * as calc from '.';

const Side = calc.Side;
const Point = calc.Point;

describe('actions', () => {
  it('should create an action to set a side length', () => {
    const side = Side.AB;
    const length = 50.0;
    expect(calc.setSide(side, length))
      .toEqual({ type: calc.SET_SIDE, side, length });
  });

  it('should create an action to set an angle', () => {
    const point = Point.A;
    const angle = Math.PI / 4;
    expect(calc.setAngle(point, angle))
      .toEqual({ type: calc.SET_ANGLE, point, angle });
  });

  it('should create an action to unset a side', () => {
    const side = Side.AC;
    expect(calc.unsetSide(side))
      .toEqual({ type: calc.UNSET_SIDE, side });
  });

  it('should create an action to unset an angle', () => {
    const point = Point.C;
    expect(calc.unsetAngle(point))
      .toEqual({ type: calc.UNSET_ANGLE, point });
  });
});
