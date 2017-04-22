import { RectPoint, PolarPoint } from './Point';
// import Line from './Line';
import * as trig from './trigLaws';

function Triangle() { /* Base Prototype */ }

Triangle.prototype.intersect = function intersect(that) {
  const b1 = this.pointAtX(0).y;
  const b2 = that.pointAtX(0).y;
  const m1 = this.m;
  const m2 = that.m;

  const x = (b2 - b1) / (m1 - m2);
  return this.pointAtX(x);
};

Object.defineProperty(Triangle.prototype, 'm', {
  get: function get() {
    return Math.tan(this.angle);
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
  }

  return fromAllMetrics({ a, b, c, A, B, C });
};

function fromAllMetrics(metrics) {
  const a = RectPoint(0, 0);
  const b = RectPoint(0, metrics.C);
  const c = PolarPoint(metrics.b, metrics.A);
  return Triangle.FromPoints(a, b, c);
}

export default Triangle;

export function canInferTriangle(known) {
  const numSides = !!known.c + !!known.a + !!known.b;
  const numAngles = !!known.A + !!known.B + !!known.C;
  return (numSides + numAngles >= 3) && (numSides >= 1);
}
