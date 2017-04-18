/* Functionality common to all points */
const BaseProto = {};

BaseProto.moveXY = function moveXY(dx, dy) {
  return XY(this.x + dx, this.y + dy);
};

BaseProto.movePolar = function movePolar(angle, d) {
  const dx = Math.cos(angle) * d;
  const dy = Math.sin(angle) * d;
  return this.moveXY(dx, dy);
};

/* Rectangular Points */
const XYProto = Object.create(BaseProto);

Object.defineProperty(XYProto, 'angle', {
  get: function get() {
    if (this.y === 0) return 0;
    if (this.x === 0) return (Math.PI / 2);
    return Math.atan(this.y / this.x);
  },
});

Object.defineProperty(XYProto, 'r', {
  get: function get() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },
});

function XY(x, y) {
  const point = Object.create(XYProto);
  point.x = x;
  point.y = y;
  return point;
}

/* Polar Points */
const PolarProto = Object.create(BaseProto);

Object.defineProperty(PolarProto, 'x', {
  get: function get() {
    return Math.cos(this.angle) * this.r;
  },
});

Object.defineProperty(PolarProto, 'y', {
  get: function get() {
    return Math.sin(this.angle) * this.r;
  },
});

function Polar(angle, r) {
  const point = Object.create(PolarProto);
  point.angle = angle;
  point.r = r;
  return point;
}

/* Public API */
export default { XY, Polar };
