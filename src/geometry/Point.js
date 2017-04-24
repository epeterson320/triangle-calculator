const { abs } = Math;

function Point() { /* abstract base prototype */ }

Point.prototype.moveXY = function moveXY(dx, dy) {
  return RectPoint(this.x + dx, this.y + dy);
};

Point.prototype.movePolar = function movePolar(angle, d) {
  const dx = Math.cos(angle) * d;
  const dy = Math.sin(angle) * d;
  return this.moveXY(dx, dy);
};

Point.prototype.equals = function equals(that, precision = 0.01) {
  const xEq = abs(this.x - that.x) < precision;
  const yEq = abs(this.y - that.y) < precision;
  return xEq && yEq;
};

function assertNumber(...args) {
  args.forEach((arg) => {
    if (typeof arg !== 'number') {
      throw new Error(`Expected a number, ${typeof arg} provided.`);
    }
  });
}
/* Rectangular Points */
function RectPoint(x, y) {
  assertNumber(x, y);
  const point = Object.create(RectPoint.prototype);
  point.x = x;
  point.y = y;
  return point;
}

RectPoint.prototype = new Point();

Object.defineProperty(RectPoint.prototype, 'angle', {
  get: function get() {
    return (this.y === 0) ? 0 : Math.atan(this.y / this.x);
  },
});

Object.defineProperty(RectPoint.prototype, 'r', {
  get: function get() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },
});

/* Polar Points */
function PolarPoint(r, angle) {
  assertNumber(r, angle);
  const point = Object.create(PolarPoint.prototype);
  point.angle = angle;
  point.r = r;
  return point;
}

PolarPoint.prototype = new Point();

Object.defineProperty(PolarPoint.prototype, 'x', {
  get: function get() {
    return Math.cos(this.angle) * this.r;
  },
});

Object.defineProperty(PolarPoint.prototype, 'y', {
  get: function get() {
    return Math.sin(this.angle) * this.r;
  },
});


/* Public API */
export { RectPoint, PolarPoint, Point };
