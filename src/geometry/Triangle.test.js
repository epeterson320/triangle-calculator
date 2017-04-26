import test from 'tape';
import Triangle from './Triangle';
import { RectPoint, PolarPoint } from './Point';

const { sqrt, max, min, PI } = Math;

// A 30-60-90 triangle for various tests.
const ptA = RectPoint(0, 0);
const ptB = RectPoint(1, 0);
const ptC = PolarPoint(sqrt(3), PI / 2);
const t306090 = Triangle.FromPoints(ptA, ptB, ptC);

test('Has a FromPoints constructor', (t) => {
  t.ok(Triangle.FromPoints(ptA, ptB, ptC) instanceof Triangle);
  t.end();
});

test('Has a FromMetrics constructor', (t) => {
  t.ok(Triangle.FromMetrics({ a: 3, b: 4, c: 5 }) instanceof Triangle);
  t.end();
});

test('Throws an error if not provided with enough metrics', (t) => {
  t.throws(() => Triangle.fromMetrics({ A: PI / 3, B: PI / 2, C: PI / 6 }));
  t.throws(() => Triangle.fromMetrics({ A: PI / 3, a: 2, B: 0 }));
  t.throws(() => Triangle.fromMetrics({ A: PI / 3, b: 2, B: 0 }));
  t.throws(() => Triangle.fromMetrics({ b: 2, c: 3 }));
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

test('Viewport is not too big', (t) => {
  const { a, b, c } = t306090; // eslint-disable-line no-shadow
  const { xl, xr, yt, yb } = t306090.viewbox;
  const tWidth = max(a.x, b.x, c.x) - min(a.x, b.x, c.x);
  const tHeight = max(a.y, b.y, c.y) - min(a.y, b.y, c.y);
  const vbWidth = xr - xl;
  const vbHeight = yt - yb;
  t.ok(max(tWidth / vbWidth, tHeight / vbHeight) > 0.5);
  t.end();
});
