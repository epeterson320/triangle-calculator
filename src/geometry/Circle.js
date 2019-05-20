import { RectPoint } from './Point';

const { sqrt, pow } = Math;

export default function Circle(xOrPoint, yOrR, r) {
  const c = Object.create(Circle.prototype);

  if (typeof xOrPoint === 'number') {
    c.center = RectPoint(xOrPoint, yOrR);
    c.radius = r;
  } else if (typeof yOrR === 'number') {
    c.center = xOrPoint;
    c.radius = yOrR;
  } else {
    // Lifted from
    // en.wikipedia.org/wiki/Circumscribed_circle#Cartesian_coordinates_2
    const p1 = xOrPoint;
    const p2 = yOrR;
    const p3 = r;

    const p1sq = pow(p1.x, 2) + pow(p1.y, 2);
    const p2sq = pow(p2.x, 2) + pow(p2.y, 2);
    const p3sq = pow(p3.x, 2) + pow(p3.y, 2);

    const D =
      2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));

    const Ux =
      (1 / D) *
      (p1sq * (p2.y - p3.y) + p2sq * (p3.y - p1.y) + p3sq * (p1.y - p2.y));
    const Uy =
      (1 / D) *
      (p1sq * (p3.x - p2.x) + p2sq * (p1.x - p3.x) + p3sq * (p2.x - p1.x));

    c.center = RectPoint(Ux, Uy);
    c.radius = sqrt(pow(p1.x - Ux, 2) + pow(p1.y - Uy, 2));
  }
  return c;
}

Circle.prototype.contains = function contains(point) {
  const dx = this.center.x - point.x;
  const dy = this.center.y - point.y;
  const d = sqrt(pow(dx, 2) + pow(dy, 2));
  return d <= this.radius;
};
