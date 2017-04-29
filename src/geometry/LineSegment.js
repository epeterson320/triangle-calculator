import { RectPoint } from './Point'

const { abs, atan, PI } = Math
const ANG_360 = PI * 2

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

Line.prototype.pointAtX = function pointAtX (x) {
  const dx = x - this.point1.x
  const dy = this.m * dx
  return RectPoint(x, this.point1.y + dy)
}

Line.prototype.pointAtY = function pointAtY (y) {
  const dy = y - this.point1.y
  const dx = dy / this.m
  return RectPoint(this.point1.x + dx, y)
}

Line.prototype.equals = function equals (that, precision = 0.01) {
  const angEq = abs(normalizeAngle(this.angle) - normalizeAngle(that.angle)) <
    precision
  let thisIntr
  let thatIntr
  try { thisIntr = this.pointAtX(0) } catch (e) { thisIntr = false }
  try { thatIntr = that.pointAtX(0) } catch (e) { thatIntr = false }

  const intrEq = (isNaN(thisIntr) && isNaN(thatIntr)) ||
    abs(thisIntr - thatIntr) < precision

  return angEq && intrEq
}

Line.PointPoint = function PointPoint (point1, point2) {
  if (point1.equals(point2)) throw new Error('Points are identical')
  const line = Object.create(Line.prototype)
  line.point1 = point1
  line.point2 = point2
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  line.m = dy / dx
  line.angle = atan(line.m || 0)
  return line
}

Line.PointAngle = function PointAngle (point, angle) {
  return Line.PointPoint(point, point.movePolar(angle, 1.0))
}

Line.PointSlope = function PointSlope (point, slope) {
  return Line.PointAngle(point, atan(slope))
}

Line.SlopeIntercept = function SlopeIntercept (slope, intercept) {
  if (slope === Infinity || slope === -Infinity) {
    return Line.PointPoint(RectPoint(0, 0), RectPoint(0, 1))
  }
  return Line.PointPoint(
    RectPoint(0, intercept),
    RectPoint(1, intercept + slope))
}

export default Line

function normalizeAngle (angle) {
  const rem = angle % ANG_360
  return (rem < 0) ? (rem + ANG_360) : rem
}
