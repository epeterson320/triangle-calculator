import { RectPoint, PolarPoint } from './Point';
// import Line from './Line';
import * as trig from './trigLaws';

const { PI } = Math;

export default function Triangle() { /* Base Prototype */ }

Triangle.prototype.someMethod = function someMethod() {
  return 'foobar';
};

Object.defineProperty(Triangle.prototype, 'someprop', {
  get: function get() {
    return 'hey';
  },
});

Triangle.FromPoints = function FromPoints(a, b, c) {
  const t = Object.create(Triangle.prototype);
  t.a = a;
  t.b = b;
  t.c = c;
  return t;
};

Triangle.FromMetrics = function FromMetrics(metrics) {
  let { a, b, c, A, B, C } = metrics;
  const numAngles = !!A + !!B + !!C;

  // 3 Sides
  if (a && b && c) {
    [A, B, C] = trig.ABCfromabc(a, b, c);
  // 2 sides & 1 common angle
  } else if (a && b && C) {
    [A, B, c] = trig.ABcfromabC(a, b, C);
  } else if (a && c && B) {
    [A, C, b] = trig.ABcfromabC(a, c, B);
  } else if (b && c && A) {
    [B, C, a] = trig.ABcfromabC(b, c, A);
  // 2 sides & 1 uncommon angle
  } else if (a && b && A) {
    [B, c, C] = trig.BcCfromabA(a, b, A);
  } else if (a && b && B) {
    [A, c, C] = trig.BcCfromabA(b, a, B);
  } else if (a && c && A) {
    [C, b, B] = trig.BcCfromabA(a, c, A);
  } else if (a && c && C) {
    [A, b, B] = trig.BcCfromabA(c, a, C);
  } else if (b && c && B) {
    [C, a, A] = trig.BcCfromabA(b, c, B);
  } else if (b && c && C) {
    [B, a, A] = trig.BcCfromabA(c, b, C);
  // 1 side & 2 angles
  } else if (numAngles === 2) {
    A = A || (PI - B - C);
    B = B || (PI - A - C);
    C = C || (PI - A - B);
    if (a) { [b, c] = trig.bcfromaABC(a, A, B, C); }
    if (b) { [a, c] = trig.bcfromaABC(b, B, A, C); }
    if (c) { [b, a] = trig.bcfromaABC(c, C, B, A); }
  }

  if (a && b && c && A && B && C) {
    return fromAllMetrics({ a, b, c, A, B, C });
  }
  throw new Error('Not enough metrics specified');
};

function fromAllMetrics(metrics) {
  const a = RectPoint(0, 0);
  const b = RectPoint(0, metrics.C);
  const c = PolarPoint(metrics.b, metrics.A);
  return Triangle.FromPoints(a, b, c);
}
