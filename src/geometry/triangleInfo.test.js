import test from 'tape';
import chai from 'chai';
import {
  canInferTriangle,
  inferMeasurements,
} from './triangleInfo';

const { sqrt, sin, PI } = Math;
const assert = chai.assert;
const delta = 1E-6;
const c = 1;
const b = 2;
const a = sqrt(3);
const A = PI / 3;
const B = PI / 2;
const C = PI / 6;

function isValid(m) {
  const { a, b, c, A, B, C } = m; // eslint-disable-line no-shadow
  if (a + b < c || a + c < b || b + c < a) return false;
  assert.approximately(sin(A) / a, sin(B) / b, delta);
  assert.approximately(sin(A) / a, sin(C) / c, delta);
  return !!a && !!b && !!c && !!A && !!B && !!C;
}

test('Can infer from 3 sides', (t) => {
  t.true(canInferTriangle({ a, b, c }));
  t.end();
});

test('Can infer from 2 sides and 1 angle', (t) => {
  t.true(canInferTriangle({ a, b, A }));
  t.end();
});

test('Can\'t infer from 3 angles and no sides', (t) => {
  t.false(canInferTriangle({ A, B, C }));
  t.end();
});

test('Can infer 3rd angle from incomplete measurements', (t) => {
  t.inDelta(inferMeasurements({ A, B }).C, C);
  t.inDelta(inferMeasurements({ A, B: 0, C }).B, B);
  t.end();
});

test('Works with three sides', (t) => {
  t.ok(isValid(inferMeasurements({ a, b, c })));
  t.end();
});

test('Works with 2 sides and 1 common angle', (t) => {
  t.ok(isValid(inferMeasurements({ a, b, C })));
  t.ok(isValid(inferMeasurements({ a, c, B })));
  t.ok(isValid(inferMeasurements({ b, c, A })));
  t.end();
});

test('Works with 2 sides and 1 uncommon angle', (t) => {
  t.ok(isValid(inferMeasurements({ a, b, A })));
  t.ok(isValid(inferMeasurements({ a, c, C })));
  t.ok(isValid(inferMeasurements({ b, c, C })));
  t.end();
});

test('Works with 2 angles and 1 side', (t) => {
  t.ok(isValid(inferMeasurements({ A, B, a })));
  t.ok(isValid(inferMeasurements({ A, B, b })));
  t.ok(isValid(inferMeasurements({ A, C, a })));
  t.ok(isValid(inferMeasurements({ A, C, b })));
  t.ok(isValid(inferMeasurements({ B, C, a })));
  t.ok(isValid(inferMeasurements({ B, C, c })));
  t.end();
});
