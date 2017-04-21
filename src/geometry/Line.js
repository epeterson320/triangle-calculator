import { RectPoint } from './Point';

function Line() { /* Abstract base prototype */ }

Line.prototype.intersect = function intersect(that) {
  const b1 = this.pointAtX(0).y;
  const b2 = that.pointAtX(0).y;
  const m1 = this.m;
  const m2 = that.m;

  const x = (b2 - b1) / (m1 - m2);
  return this.pointAtX(x);
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
