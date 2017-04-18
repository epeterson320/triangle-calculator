import Point from './Point';

const BaseProto = {};

BaseProto.intersect = function intersect(that) {
  const b1 = this.pointAtX(0).y;
  const b2 = that.pointAtX(0).y;
  const m1 = this.m;
  const m2 = that.m;

  const x = (b2 - b1) / (m1 - m2);
  return this.pointAtX(x);
};

BaseProto.angleBisector = function angleBisector(that) {
  const angle = (this.angle + that.angle) / 2;
  const point = this.intersect(that);
  return PointAngle(point, angle);
};

BaseProto.pointAtX = function pointAtX(x) {
  const dx = x - this.point.x;
  const dy = this.m * dx;
  return Point.XY(x, this.point.y + dy);
};

BaseProto.pointAtY = function pointAtY(y) {
  const dy = y - this.point.y;
  const dx = dy / this.m;
  return Point.XY(this.point.x + dx, y);
};

Object.defineProperty(BaseProto, 'm', {
  get: function get() {
    return Math.tan(this.angle);
  },
});

function PointPoint(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const angle = Math.atan(dy / dx) || 0;
  return PointAngle(point1, angle);
}

function PointAngle(point, angle) {
  const line = Object.create(BaseProto);
  line.point = point;
  line.angle = angle;
  return line;
}

function PointSlope(point, slope) {
  const angle = Math.atan(slope);
  return PointAngle(point, angle);
}

function SlopeIntercept(slope, intercept) {
  const point = Point.XY(0, intercept);
  const angle = Math.atan(slope);
  return PointAngle(point, angle);
}

export default { PointPoint, PointAngle, PointSlope, SlopeIntercept };
