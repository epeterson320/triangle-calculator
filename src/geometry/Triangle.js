import { RectPoint, PolarPoint } from './Point';
import * as trig from './trigLaws';

const { PI, sqrt } = Math;

export default function Triangle() { /* Base Prototype */ }

Triangle.prototype.someMethod = function someMethod() {
  return 'foobar';
};

Object.defineProperty(Triangle.prototype, 'circumcenter', {
  get: function get() {
    // Lifted from
    // en.wikipedia.org/wiki/Circumscribed_circle#Cartesian_coordinates_2
    const ax = this.a.x;
    const ay = this.a.y;
    const bx = this.b.x;
    const by = this.b.y;
    const cx = this.c.x;
    const cy = this.c.y;
    const a2 = ax * ax + ay * ay;
    const b2 = bx * bx + by * by;
    const c2 = cx * cx + cy * cy;

    const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

    const Ux = 1 / D * (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by));
    const Uy = 1 / D * (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax));

    return RectPoint(Ux, Uy);
  },
});

Object.defineProperty(Triangle.prototype, 'viewbox', {
  get: function get() {
    const u = this.circumcenter;
    const a = this.a;
    const dx = u.x - a.x;
    const dy = u.y - a.y;
    const r = sqrt(dx * dx + dy * dy); // radius of circumcenter
    const hs = r * 1.20; // half the side length of viewbox
    return {
      xl: u.x - hs,
      xr: u.x + hs,
      yb: u.y - hs,
      yt: u.y + hs,
    };
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
  const b = RectPoint(metrics.c, 0);
  const c = PolarPoint(metrics.b, metrics.A);
  return Triangle.FromPoints(a, b, c);
}
