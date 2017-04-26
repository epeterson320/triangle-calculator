import test from 'tape';
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


// REDUCER

test('returns an initial state', (t) => {
  const state = reduce();
  t.ok(state);
  t.end();
});

test('sets sides', (t) => {
  const state1 = reduce(undefined, setSide(Side.a, 2.0));
  const state2 = reduce(state1, setSide(Side.b, 3.4));
  t.equal(state2.a, 2.0);
  t.equal(state2.b, 3.4);
  t.end();
});

test('sets angles', (t) => {
  const state1 = reduce(undefined, setAngle(Point.A, A45));
  const state2 = reduce(state1, setAngle(Point.B, A30));
  t.equal(state2.A, A45);
  t.equal(state2.B, A30);
  t.end();
});

test('unsets sides', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 5));
  const state = reduce(state0, unsetSide(Side.a));
  t.equal(state.a, 0);
  t.end();
});

test('unsets angles', (t) => {
  const state0 = reduce(undefined, setAngle(Point.B, A45));
  const state = reduce(state0, unsetAngle(Point.B));
  t.equal(state.B, 0);
  t.end();
});

test('doesn\'t set a third side when one angle is set', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 3));
  const state1 = reduce(state0, setSide(Side.b, 3));
  const state2 = reduce(state1, setAngle(Point.C, A60));
  const state = reduce(state2, setSide(Side.c, 3));
  t.equal(state.c, 0);
  t.end();
});

test('doesn\'t set a second side when two angles are set', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 3));
  const state1 = reduce(state0, setAngle(Point.B, A60));
  const state2 = reduce(state1, setAngle(Point.C, A60));
  const state = reduce(state2, setSide(Side.b, 3));
  t.equal(state.b, 0);
  t.end();
});

test('doesn\'t set an angle when three sides are set', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 3));
  const state1 = reduce(state0, setSide(Side.b, 3));
  const state2 = reduce(state1, setSide(Side.c, 3));
  const state = reduce(state2, setAngle(Point.A, A60));
  t.equal(state.A, 0);
  t.end();
});

test('doesn\'t set a second angle when two sides are set', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 3));
  const state1 = reduce(state0, setSide(Side.b, 3));
  const state2 = reduce(state1, setAngle(Point.A, A45));
  const state = reduce(state2, setAngle(Point.B, A45));
  t.equal(state.B, 0);
  t.end();
});

test('never sets a third angle', (t) => {
  const state0 = reduce(undefined, setAngle(Point.A, A60));
  const state1 = reduce(state0, setAngle(Point.B, A60));
  const state = reduce(state1, setAngle(Point.C, A60));
  t.equal(state.C, 0);
  t.end();
});

test('overwrites sides', (t) => {
  const state0 = reduce(undefined, setSide(Side.a, 3));
  const state1 = reduce(state0, setSide(Side.b, 3));
  const state2 = reduce(state1, setAngle(Point.A, A60));
  const state = reduce(state2, setSide(Side.a, 2.5));
  t.equal(state.a, 2.5);
  t.end();
});

test('overwrites angles', (t) => {
  const state0 = reduce(undefined, setAngle(Point.A, A60));
  const state1 = reduce(state0, setAngle(Point.B, A60));
  const state2 = reduce(state1, setSide(Side.a, 4.0));
  const state = reduce(state2, setAngle(Point.A, A45));
  t.equal(state.A, A45);
  t.end();
});

test('doesn\'t set impossible angles', (t) => {
  // Try to make a triangle with two right angles
  const state0 = reduce(undefined, setAngle(Point.A, A90));
  const state = reduce(state0, setAngle(Point.B, A90));
  // Ignore the invalid input
  t.equal(state.b, 0);
  t.end();
});

test('doesn\'t set impossible sides', (t) => {
  const state1 = reduce(undefined, setSide(Side.a, 2));
  const state2 = reduce(state1, setSide(Side.b, 1));
  const state = reduce(state2, setSide(Side.c, 1));
  t.equal(state.c, 0);
  t.end();
});

test('throws away invalid input', (t) => {
  const state = reduce();
  t.deepEqual(reduce(state, setSide(Side.a, 'pickles')), state);
  t.deepEqual(reduce(state, setSide(Side.a, NaN)), state);
  t.deepEqual(reduce(state, setSide(Side.a, Infinity)), state);
  t.end();
});

// ACTION CREATORS

test('should create an action to set a side length', (t) => {
  const side = Side.a;
  const length = 50.0;
  t.deepEqual(setSide(side, length), { type: SET_SIDE, side, length });
  t.end();
});

test('should create an action to set an angle', (t) => {
  const point = Point.A;
  const angle = Math.PI / 4;
  t.deepEqual(setAngle(point, angle), { type: SET_ANGLE, point, angle });
  t.end();
});

test('should create an action to unset a side', (t) => {
  const side = Side.b;
  t.deepEqual(unsetSide(side), { type: UNSET_SIDE, side });
  t.end();
});

test('should create an action to unset an angle', (t) => {
  const point = Point.C;
  t.deepEqual(unsetAngle(point), { type: UNSET_ANGLE, point });
  t.end();
});
