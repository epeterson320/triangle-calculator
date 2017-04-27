import reduce, {
  setSide,
  setAngle,
  unsetSide,
  unsetAngle,
  Point,
  Side,
  SET_SIDE,
  SET_ANGLE,
  UNSET_SIDE,
  UNSET_ANGLE,
} from './measurements';

// Angles for use with tests.
const A30 = Math.PI / 6;
const A45 = Math.PI / 4;
const A60 = Math.PI / 3;
const A90 = Math.PI / 2;

describe('Reducer', () => {
  it('returns an initial state', () => {
    const state = reduce();
    expect(state).toBeDefined();
  });

  it('sets sides', () => {
    const state1 = reduce(undefined, setSide(Side.a, 2.0));
    const state2 = reduce(state1, setSide(Side.b, 3.4));
    expect(state2.a).toBe(2.0);
    expect(state2.b).toBe(3.4);
  });

  it('sets angles', () => {
    const state1 = reduce(undefined, setAngle(Point.A, A45));
    const state2 = reduce(state1, setAngle(Point.B, A30));
    expect(state2.A).toBe(A45);
    expect(state2.B).toBe(A30);
  });

  it('unsets sides', () => {
    const state0 = reduce(undefined, setSide(Side.a, 5));
    const state = reduce(state0, unsetSide(Side.a));
    expect(state.a).toBe(0);
  });

  it('unsets angles', () => {
    const state0 = reduce(undefined, setAngle(Point.B, A45));
    const state = reduce(state0, unsetAngle(Point.B));
    expect(state.B).toBe(0);
  });

  it('doesn\'t set a third side when one angle is set', () => {
    const state0 = reduce(undefined, setSide(Side.a, 3));
    const state1 = reduce(state0, setSide(Side.b, 3));
    const state2 = reduce(state1, setAngle(Point.C, A60));
    const state = reduce(state2, setSide(Side.c, 3));
    expect(state.c).toBe(0);
  });

  it('doesn\'t set a second side when two angles are set', () => {
    const state0 = reduce(undefined, setSide(Side.a, 3));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state2 = reduce(state1, setAngle(Point.C, A60));
    const state = reduce(state2, setSide(Side.b, 3));
    expect(state.b).toBe(0);
  });

  it('doesn\'t set an angle when three sides are set', () => {
    const state0 = reduce(undefined, setSide(Side.a, 3));
    const state1 = reduce(state0, setSide(Side.b, 3));
    const state2 = reduce(state1, setSide(Side.c, 3));
    const state = reduce(state2, setAngle(Point.A, A60));
    expect(state.A).toBe(0);
  });

  it('doesn\'t set a second angle when two sides are set', () => {
    const state0 = reduce(undefined, setSide(Side.a, 3));
    const state1 = reduce(state0, setSide(Side.b, 3));
    const state2 = reduce(state1, setAngle(Point.A, A45));
    const state = reduce(state2, setAngle(Point.B, A45));
    expect(state.B).toBe(0);
  });

  it('never sets a third angle', () => {
    const state0 = reduce(undefined, setAngle(Point.A, A60));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state = reduce(state1, setAngle(Point.C, A60));
    expect(state.C).toBe(0);
  });

  it('overwrites sides', () => {
    const state0 = reduce(undefined, setSide(Side.a, 3));
    const state1 = reduce(state0, setSide(Side.b, 3));
    const state2 = reduce(state1, setAngle(Point.A, A60));
    const state = reduce(state2, setSide(Side.a, 2.5));
    expect(state.a).toBe(2.5);
  });

  it('overwrites angles', () => {
    const state0 = reduce(undefined, setAngle(Point.A, A60));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state2 = reduce(state1, setSide(Side.a, 4.0));
    const state = reduce(state2, setAngle(Point.A, A45));
    expect(state.A).toBe(A45);
  });

  it('doesn\'t set impossible angles', () => {
    // Try to make a triangle with two right angles
    const state0 = reduce(undefined, setAngle(Point.A, A90));
    const state = reduce(state0, setAngle(Point.B, A90));
    // Ignore the invalid input
    expect(state.b).toBe(0);
  });

  it('doesn\'t set impossible sides', () => {
    const state1 = reduce(undefined, setSide(Side.a, 2));
    const state2 = reduce(state1, setSide(Side.b, 1));
    const state = reduce(state2, setSide(Side.c, 1));
    expect(state.c).toBe(0);
  });

  it('throws away invalid input', () => {
    const state = reduce();
    expect(reduce(state, setSide(Side.a, 'pickles'))).toEqual(state);
    expect(reduce(state, setSide(Side.a, NaN))).toEqual(state);
    expect(reduce(state, setSide(Side.a, Infinity))).toEqual(state);
  });
});

describe('Action Creators', () => {
  it('should create an action to set a side length', () => {
    const side = Side.a;
    const length = 50.0;
    expect(setSide(side, length)).toEqual({ type: SET_SIDE, side, length });
  });

  it('should create an action to set an angle', () => {
    const point = Point.A;
    const angle = Math.PI / 4;
    expect(setAngle(point, angle)).toEqual({ type: SET_ANGLE, point, angle });
  });

  it('should create an action to unset a side', () => {
    const side = Side.b;
    expect(unsetSide(side)).toEqual({ type: UNSET_SIDE, side });
  });

  it('should create an action to unset an angle', () => {
    const point = Point.C;
    expect(unsetAngle(point)).toEqual({ type: UNSET_ANGLE, point });
  });
});
