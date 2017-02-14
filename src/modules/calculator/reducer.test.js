import reduce, {
  setSide, setAngle, unsetSide, unsetAngle, Side, Point,
} from '.';

// Angles for use with tests.
const A30 = Math.PI / 6;
const A45 = Math.PI / 4;
const A60 = Math.PI / 3;
const A90 = Math.PI / 2;

describe('calculator', () => {
  it('should return the initial state', () => {
    const state = reduce(undefined, {});
    expect(state).toEqual({ ab: 0, ac: 0, bc: 0, a: 0, b: 0, c: 0 });
  });

  it('should set sides', () => {
    const state1 = reduce(undefined, setSide(Side.AB, 2.0));
    const state2 = reduce(state1, setSide(Side.AC, 3.4));
    expect(state2.ab).toBe(2.0);
    expect(state2.ac).toBe(3.4);
  });

  it('should set angles', () => {
    const state1 = reduce(undefined, setAngle(Point.A, A45));
    const state2 = reduce(state1, setAngle(Point.B, A30));
    expect(state2.a).toBe(A45);
    expect(state2.b).toBe(A30);
  });

  it('should unset sides', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 5));
    const state = reduce(state0, unsetSide(Side.AB));
    expect(state.ab).toBe(0);
  });

  it('should unset angles', () => {
    const state0 = reduce(undefined, setAngle(Point.B, A45));
    const state = reduce(state0, unsetAngle(Point.B));
    expect(state.b).toBe(0);
  });

  it('should not set a third side when one angle is set', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 3));
    const state1 = reduce(state0, setSide(Side.AC, 3));
    const state2 = reduce(state1, setAngle(Point.C, A60));
    const state = reduce(state2, setSide(Side.BC, 3));
    expect(state.bc).toBe(0);
  });

  it('should not set a second side when two angles are set', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 3));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state2 = reduce(state1, setAngle(Point.C, A60));
    const state = reduce(state2, setSide(Side.BC, 3));
    expect(state.bc).toBe(0);
  });

  it('should not set an angle when three sides are set', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 3));
    const state1 = reduce(state0, setSide(Side.AC, 3));
    const state2 = reduce(state1, setSide(Side.BC, 3));
    const state = reduce(state2, setAngle(Point.A, A60));
    expect(state.a).toBe(0);
  });

  it('should not set a second angle when two sides are set', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 3));
    const state1 = reduce(state0, setSide(Side.AC, 3));
    const state2 = reduce(state1, setAngle(Point.A, A45));
    const state = reduce(state2, setAngle(Point.B, A45));
    expect(state.b).toBe(0);
  });

  it('should not set a third angle, ever', () => {
    const state0 = reduce(undefined, setAngle(Point.A, A60));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state = reduce(state1, setAngle(Point.C, A60));
    expect(state.c).toBe(0);
  });

  it('should overwrite sides when data is set', () => {
    const state0 = reduce(undefined, setSide(Side.AB, 3));
    const state1 = reduce(state0, setSide(Side.AC, 3));
    const state2 = reduce(state1, setAngle(Point.A, A60));
    const state = reduce(state2, setSide(Side.AB, 2.5));
    expect(state.ab).toBe(2.5);
  });

  it('should overwrite angles when data is set', () => {
    const state0 = reduce(undefined, setAngle(Point.A, A60));
    const state1 = reduce(state0, setAngle(Point.B, A60));
    const state2 = reduce(state1, setSide(Side.AB, 4.0));
    const state = reduce(state2, setAngle(Point.A, A45));
    expect(state.a).toBe(A45);
  });

  it('should not set impossible angles', () => {
    // Try to make a triangle with two right angles
    const state0 = reduce(undefined, setAngle(Point.A, A90));
    const state = reduce(state0, setAngle(Point.B, A90));
    // Ignore the invalid input
    expect(state.b).toBe(0);
  });
});
