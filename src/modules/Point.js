export function PointXY(x, y) {
  const point = Object.create(PointXY.prototype);
  point.x = x;
  point.y = y;
  return point;
}

Object.defineProperty(PointXY.prototype, 'angle', {
  get: function get() {
    if (this.y === 0) return 0;
    if (this.x === 0) return (Math.PI / 2);
    return Math.atan(this.y / this.x);
  },
});

Object.defineProperty(PointXY.prototype, 'r', {
  get: function get() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },
});

export function PointPolar(angle, r) {
  const point = Object.create(PointPolar.prototype);
  point.angle = angle;
  point.r = r;
  return point;
}

Object.defineProperty(PointPolar.prototype, 'x', {
  get: function get() {
    return Math.cos(this.angle) * this.r;
  },
});

Object.defineProperty(PointPolar.prototype, 'y', {
  get: function get() {
    return Math.sin(this.angle) * this.r;
  },
});

function moveXY(dx, dy) {
  return PointXY(this.x + dx, this.y + dy);
}

function movePolar(angle, d) {
  const dx = Math.cos(angle) * d;
  const dy = Math.sin(angle) * d;
  return this.moveXY(dx, dy);
}

PointXY.prototype.moveXY = moveXY;
PointXY.prototype.movePolar = movePolar;

PointPolar.prototype.moveXY = moveXY;
PointPolar.prototype.movePolar = movePolar;
