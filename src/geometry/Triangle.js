import { RectPoint, PolarPoint } from './Point';
import Line from './Line';
import { ABCfromabc } from './trigLaws';

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
  const numSides = !!metrics.ab + !!metrics.ac + !!metrics.bc;
  if (numSides === 3) {
    const [a, b, c] = ABCfromabc(metrics.bc, metrics.ac, metrics.ab);
    return fromAllMetrics(Object.assign({}, metrics, { a, b, c }));
  }
};

function fromAllMetrics(metrics) {
  const a = RectPoint(0, 0);
  const b = RectPoint(0, metrics.ab);
  const c = PolarPoint(metrics.ac, metrics.A);
  return Triangle.FromPoints(a, b, c);
}

export default Triangle;

export function canInferTriangle(known) {
  const numSides = !!known.ab + !!known.bc + !!known.ac;
  const numAngles = !!known.a + !!known.b + !!known.c;
  return (numSides + numAngles >= 3) && (numSides >= 1);
}
