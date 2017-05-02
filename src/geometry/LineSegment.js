import { RectPoint } from './Point'

const { atan, sqrt, PI } = Math

function Line () { /* Abstract base prototype */ }

Line.prototype.intersect = function intersect (that) {
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

Line.prototype.equals = function equals (that, precision = 0.01) {
  return this.point1.equals(that.point1, precision) &&
    this.point2.equals(that.point2, precision)
}

Object.defineProperty(Line.prototype, 'midpoint', {
  get: function get () {
    const x = (this.point1.x + this.point2.x) / 2
    const y = (this.point1.y + this.point2.y) / 2
    return RectPoint(x, y)
  }
})

Object.defineProperty(Line.prototype, 'angle', {
  get: function get () {
    const dx = this.point2.x - this.point1.x
    const dy = this.point2.y - this.point1.y

    const angle = atan(dy / dx)
    if (dx < 0) return angle + PI
    if (dy < 0) return angle + (2 * PI)
    return angle
  }
})

Object.defineProperty(Line.prototype, 'distance', {
  get: function get () {
    const dx = this.point2.x - this.point1.x
    const dy = this.point2.y - this.point1.y
    return sqrt(dx * dx + dy * dy)
  }
})

Line.PointPoint = function PointPoint (point1, point2) {
  if (point1.equals(point2, 0)) throw new Error('Points are identical')
  const line = Object.create(Line.prototype)
  line.point1 = point1
  line.point2 = point2
  return line
}

Line.PointAngleDistance = function PointAngle (point, angle, d) {
  const point2 = point.movePolar(angle, d)
  return Line.PointPoint(point, point2)
}

export default Line
