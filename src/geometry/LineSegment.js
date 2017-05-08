import { RectPoint } from './Point'

const { atan, sqrt, abs, max, min, PI } = Math

function LineSegment () { /* Abstract base prototype */ }

LineSegment.prototype.intersect = function intersect (that) {
  // Method used from
  // en.wikipedia.org/wiki/Line–line_intersection#Given_two_points_on_each_line
  const x1 = this.point1.x
  const y1 = this.point1.y
  const x2 = this.point2.x
  const y2 = this.point2.y
  const x3 = that.point1.x
  const y3 = that.point1.y
  const x4 = that.point2.x
  const y4 = that.point2.y

  const x1mx2 = x1 - x2
  const y3my4 = y3 - y4
  const y1my2 = y1 - y2
  const x3mx4 = x3 - x4
  const x1y2my1x2 = x1 * y2 - y1 * x2
  const x3y4my3x4 = x3 * y4 - y3 * x4
  const denom = x1mx2 * y3my4 - y1my2 * x3mx4

  const x = (x1y2my1x2 * x3mx4 - x1mx2 * x3y4my3x4) / denom
  const y = (x1y2my1x2 * y3my4 - y1my2 * x3y4my3x4) / denom
  return RectPoint(x, y)
}

LineSegment.prototype.equals = function equals (that, precision = 0.01) {
  return this.point1.equals(that.point1, precision) &&
    this.point2.equals(that.point2, precision)
}

LineSegment.prototype.bisect = function bisect (that) {
  const point = this.intersect(that)
  const angle = (this.angle + that.angle) / 2 % PI
  return LineSegment.PointAngleDistance(point, angle, 1)
}

LineSegment.prototype.contains = function bisect (p, opts = {}) {
  const extend = opts.extend || false
  const precision = opts.precision || 0.02
  if (p.equals(this.point1) || p.equals(this.point2)) return true
  const dx = p.x - this.point1.x
  const dy = p.y - this.point1.y
  const m = dx / dy
  const onExtended = abs(this.m - m) < precision
  if (!onExtended) return false
  else if (extend) return true
  else {
    const xUpper = max(this.point1.x, this.point2.x)
    const xLower = min(this.point1.x, this.point2.x)
    const yUpper = max(this.point1.y, this.point2.y)
    const yLower = min(this.point1.y, this.point2.y)
    return p.x >= xLower && p.x <= xUpper && p.y >= yLower && p.y <= yUpper
  }
}

Object.defineProperty(LineSegment.prototype, 'midpoint', {
  get: function get () {
    const x = (this.point1.x + this.point2.x) / 2
    const y = (this.point1.y + this.point2.y) / 2
    return RectPoint(x, y)
  }
})

Object.defineProperty(LineSegment.prototype, 'distance', {
  get: function get () {
    const dx = this.point2.x - this.point1.x
    const dy = this.point2.y - this.point1.y
    return sqrt(dx * dx + dy * dy)
  }
})

LineSegment.PointPoint = function PointPoint (point1, point2) {
  if (point1.equals(point2, 0)) throw new Error('Points are identical')
  const line = Object.create(LineSegment.prototype)
  line.point1 = point1
  line.point2 = point2
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  line.m = dy / dx
  line.angle = atan(line.m)
  if (dx < 0) line.angle = line.angle + PI
  else if (dy < 0) line.angle = line.angle + (2 * PI)
  return line
}

LineSegment.PointAngleDistance = function PointAngle (point, angle, d) {
  const point2 = point.movePolar(angle, d)
  return LineSegment.PointPoint(point, point2)
}

LineSegment.PointPerpendicular = function PointPerpendicular (point, otherLine) {
  const angle = otherLine.angle + (PI / 2)
  const _line = LineSegment.PointAngleDistance(point, angle, 1)
  const point2 = _line.intersect(otherLine)
  return LineSegment.PointPoint(point, point2)
}

export default LineSegment
