import reduce, * as calc from './calculator';

const Side = calc.Side;
const Point = calc.Point;

describe('actions', () => {
  it('should create an action to set a side length', () => {
    const side = Side.AB;
    const length = 50.0;

    const expectedAction = {
      type: calc.SET_SIDE, side, length,
    };

    expect(calc.setSide(side, length)).toEqual(expectedAction);
  });

  it('should create an action to set an angle', () => {
    const point = Point.A;
    const angle = Math.PI / 4;

    const expectedAction = {
      type: calc.SET_ANGLE, point, angle,
    };

    expect(calc.setAngle(point, angle)).toEqual(expectedAction);
  });

  it('should create an action to unset a side', () => {
    const side = Side.AC;

    const expectedAction = { type: calc.UNSET_SIDE, side };

    expect(calc.unsetSide(side)).toEqual(expectedAction);
  });

  it('should create an action to unset an angle', () => {
    const point = Point.C;

    const expectedAction = { type: calc.UNSET_ANGLE, point };

    expect(calc.unsetAngle(point)).toEqual(expectedAction);
  });
});

describe('calculator reducer', () => {
  it('should return the initial state', () => {
    const state = reduce(undefined, {});

    expect(state).toEqual({
      setAngles: [],
      setSides: [],
    });
  });

  it('should set sides', () => {
    const state0 = reduce(undefined, {});

    const action1 = calc.setSide(Side.AB, 2.0);
    const state1 = reduce(state0, action1);

    expect(state1).setSides[0].toEqual({
      side: Side.AB, length: 2.0,
    });

    const action2 = calc.setSide(Side.AC, 3.4);
    const state2 = reduce(state1, action2);

    expect(state2).setSides[1].toEqual({
      side: Side.AC, length: 3.4,
    });
  });
});
