import { RectPoint } from './Point';

const { abs, PI } = Math;
const ANG_360 = PI * 2;

function Line() { /* Abstract base prototype */ }

Line.prototype.intersect = function intersect(that) {
  // Method used from
  // en.wikipedia.org/wiki/Line–line_intersection#Given_two_points_on_each_line
  let x1 = 0;
  let x2 = 1;
  let x3 = 0;
  let x4 = 1;
  let y1;
  let y2;
  let y3;
  let y4;

  try {
    y1 = this.pointAtX(x1).y;
    y2 = this.pointAtX(x2).y;
  } catch (e) { // Vertical line
    x1 = this.point.x;
    x2 = this.point.x;
    y1 = 0;
    y2 = 1;
  }

  try {
    y3 = that.pointAtX(x3).y;
    y4 = that.pointAtX(x4).y;
  } catch (e) {
    x3 = that.point.x;
    x4 = that.point.x;
    y3 = 0;
    y4 = 1;
  }

  const x1mx2 = x1 - x2;
  const y3my4 = y3 - y4;
  const y1my2 = y1 - y2;
  const x3mx4 = x3 - x4;
  const x1y2my1x2 = x1 * y2 - y1 * x2;
  const x3y4my3x4 = x3 * y4 - y3 * x4;
  const denom = x1mx2 * y3my4 - y1my2 * x3mx4;
  const x = (x1y2my1x2 * x3mx4 - x1mx2 * x3y4my3x4) / denom;
  const y = (x1y2my1x2 * y3my4 - y1my2 * x3y4my3x4) / denom;
  return RectPoint(x, y);
};

Line.prototype.angleBisector = function angleBisector(that) {
  const angle = (this.angle + that.angle) / 2;
  const point = this.intersect(that);
  return Line.PointAngle(point, angle);
};

Line.prototype.pointAtX = function pointAtX(x) {
  const dx = x - this.point.x;
  const dy = this.m * dx;
  return RectPoint(x, this.point.y + dy);
};

Line.prototype.pointAtY = function pointAtY(y) {
  const dy = y - this.point.y;
  const dx = dy / this.m;
  return RectPoint(this.point.x + dx, y);
};

Line.prototype.equals = function equals(that, precision = 0.01) {
  const angEq = abs(normalizeAngle(this.angle) - normalizeAngle(that.angle))
    < precision;
  let thisIntr;
  let thatIntr;
  try { thisIntr = this.pointAtX(0); } catch (e) { thisIntr = false; }
  try { thatIntr = that.pointAtX(0); } catch (e) { thatIntr = false; }

  const intrEq = (isNaN(thisIntr) && isNaN(thatIntr))
    || abs(thisIntr - thatIntr) < precision;

  return angEq && intrEq;
};

Object.defineProperty(Line.prototype, 'm', {
  get: function get() {
    return Math.tan(this.angle);
  },
});

Line.PointPoint = function PointPoint(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const angle = Math.atan(dy / dx) || 0;
  return Line.PointAngle(point1, angle);
};

Line.PointAngle = function PointAngle(point, angle) {
  const line = Object.create(Line.prototype);
  line.point = point;
  line.angle = angle;
  return line;
};

Line.PointSlope = function PointSlope(point, slope) {
  const angle = Math.atan(slope);
  return Line.PointAngle(point, angle);
};

Line.SlopeIntercept = function SlopeIntercept(slope, intercept) {
  const point = RectPoint(0, intercept);
  const angle = Math.atan(slope);
  return Line.PointAngle(point, angle);
};

export default Line;

function normalizeAngle(angle) {
  const rem = angle % ANG_360;
  return (rem < 0) ? (rem + ANG_360) : rem;
}
