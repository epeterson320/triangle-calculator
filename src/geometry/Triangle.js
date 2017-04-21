import Point from './Point';
import Line from './Line';

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

Triangle.FromPoints = function FromPoints(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const angle = Math.atan(dy / dx) || 0;
  return Line.PointAngle(point1, angle);
};
