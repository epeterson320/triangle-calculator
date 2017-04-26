import { RectPoint, PolarPoint } from './Point';
import { canInferTriangle, inferMeasurements } from './triangleInfo';

const { sqrt } = Math;

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
  if (!canInferTriangle(metrics)) {
    throw new Error('Not enough metrics specified');
  }
  const { b, c, A } = inferMeasurements(metrics);
  const ptA = RectPoint(0, 0);
  const ptB = RectPoint(c, 0);
  const ptC = PolarPoint(b, A);
  return Triangle.FromPoints(ptA, ptB, ptC);
};
