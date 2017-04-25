import test from 'tape';
import Triangle from './Triangle';
import { RectPoint, PolarPoint } from './Point';

const { sqrt, max, min, PI } = Math;

const c = 1;
const b = sqrt(3);
const a = 2;
const A = PI / 2;
const B = PI / 3;
const C = PI / 6;

const ptA = RectPoint(0, 0);
const ptB = RectPoint(c, 0);
const ptC = PolarPoint(b, A);

// A 30-60-90 triangle for various tests.
const t306090 = Triangle.FromPoints(ptA, ptB, ptC);

test('Has a FromPoints constructor', (t) => {
  t.ok(Triangle.FromPoints(ptA, ptB, ptC) instanceof Triangle);
  t.end();
});

test('Works with three sides', (t) => {
  t.ok(Triangle.FromMetrics({ a, b, c }) instanceof Triangle);
  t.end();
});

test('Works with 2 sides and 1 common angle', (t) => {
  t.ok(Triangle.FromMetrics({ a, b, C }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ a, c, B }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ b, c, A }) instanceof Triangle);
  t.end();
});

test('Works with 2 sides and 1 uncommon angle', (t) => {
  t.ok(Triangle.FromMetrics({ a, b, A }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ a, c, C }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ b, c, C }) instanceof Triangle);
  t.end();
});

test('Works with 2 angles and 1 side', (t) => {
  t.ok(Triangle.FromMetrics({ A, B, a }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ A, B, b }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ A, C, a }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ A, C, b }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ B, C, a }) instanceof Triangle);
  t.ok(Triangle.FromMetrics({ B, C, c }) instanceof Triangle);
  t.end();
});

test('Treats metrics with value 0 as if they were not specified', (t) => {
  t.throws(() => Triangle.FromMetrics({
    A: 0, B: 0, C: 0, a: 0, b: 0, c: 0,
  }));
  t.end();
});

test('Throws an error if not provided with enough metrics', (t) => {
  t.throws(() => Triangle.FromMetrics({ A, B, C }));
  t.throws(() => Triangle.FromMetrics({ A, a, B: 0 }));
  t.throws(() => Triangle.FromMetrics({ A, b, B: 0 }));
  t.throws(() => Triangle.FromMetrics({ b, c }));
  t.end();
});

test('Should have a correct circumcenter', (t) => {
  const exp = RectPoint(0.5, sqrt(3) / 2);
  t.ok(t306090.circumcenter.equals(exp));
  t.end();
});

test('Should have a viewbox', (t) => {
  t.ok(t306090.viewbox);
  t.end();
});

test('Should be square', (t) => {
  const { xl, xr, yt, yb } = t306090.viewbox;
  t.inDelta(xr - xl, yt - yb);
  t.end();
});

test('Should contain the triangle', (t) => {
  const { xl, xr, yt, yb } = t306090.viewbox;
  [t306090.a, t306090.b, t306090.c].forEach((pt) => {
    t.ok(pt.x > xl);
    t.ok(pt.x < xr);
    t.ok(pt.y > yb);
    t.ok(pt.y < yt);
  });
  t.end();
});

test('Should not be too big', (t) => {
  const { a, b, c } = t306090; // eslint-disable-line no-shadow
  const { xl, xr, yt, yb } = t306090.viewbox;
  const tWidth = max(a.x, b.x, c.x) - min(a.x, b.x, c.x);
  const tHeight = max(a.y, b.y, c.y) - min(a.y, b.y, c.y);
  const vbWidth = xr - xl;
  const vbHeight = yt - yb;
  t.ok(max(tWidth / vbWidth, tHeight / vbHeight) > 0.5);
  t.end();
});
