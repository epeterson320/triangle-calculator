import { RectPoint, PolarPoint } from './Point'
import { canInferAll, inferMeasurements } from './triangleInfo'
import Line from './LineSegment'
import { DEG } from './Metric'

const { sqrt, PI } = Math
const ANG_90 = PI / 2

export default function Triangle () { /* Base Prototype */ }

Object.defineProperty(Triangle.prototype, 'circumcenter', {
  get: function get () {
    // Lifted from
    // en.wikipedia.org/wiki/Circumscribed_circle#Cartesian_coordinates_2
    const ax = this.a.x
    const ay = this.a.y
    const bx = this.b.x
    const by = this.b.y
    const cx = this.c.x
    const cy = this.c.y
    const a2 = ax * ax + ay * ay
    const b2 = bx * bx + by * by
    const c2 = cx * cx + cy * cy

    const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))

    const Ux = 1 / D * (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by))
    const Uy = 1 / D * (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax))

    return RectPoint(Ux, Uy)
  }
})

Object.defineProperty(Triangle.prototype, 'viewbox', {
  get: function get () {
    const u = this.circumcenter
    const a = this.a
    const dx = u.x - a.x
    const dy = u.y - a.y
    const r = sqrt(dx * dx + dy * dy) // radius of circumcenter
    const hs = r * 1.40 // half the side length of viewbox
    return {
      xl: u.x - hs,
      xr: u.x + hs,
      yb: u.y - hs,
      yt: u.y + hs
    }
  }
})

Object.defineProperty(Triangle.prototype, 'incenter', {
  get: function get () {
    const b1 = this.ab.bisect(this.ac)
    const b2 = this.ba.bisect(this.bc)
    return b1.intersect(b2)
  }
})

Object.defineProperty(Triangle.prototype, 'inradius', {
  get: function get () {
    const I = this.incenter
    return Line.PointPerpendicular(I, this.ab).distance
  }
})
Triangle.FromPoints = function FromPoints (a, b, c) {
  const t = Object.create(Triangle.prototype)
  t.a = a
  t.b = b
  t.c = c
  t.ab = Line.PointPoint(a, b)
  t.ba = Line.PointPoint(b, a)
  t.ac = Line.PointPoint(a, c)
  t.ca = Line.PointPoint(c, a)
  t.bc = Line.PointPoint(b, c)
  t.cb = Line.PointPoint(c, b)
  t.p = t.ab.distance + t.ac.distance + t.bc.distance
  const labelOffset = t.p * 0.05

  t.label = {
    a: t.bc.midpoint.movePolar(t.bc.angle - ANG_90, labelOffset),
    b: t.ac.midpoint.movePolar(t.ca.angle - ANG_90, labelOffset),
    c: t.ab.midpoint.movePolar(t.ab.angle - ANG_90, labelOffset)
  }

  return t
}

Triangle.FromMetrics = function FromMetrics (metrics) {
  if (!canInferAll(metrics)) {
    throw new Error('Not enough metrics specified')
  }
  const { b, c, A } = inferMeasurements(metrics)
  const adjA = metrics.angleUnit === DEG ? A * PI / 180 : A
  const ptA = RectPoint(0, 0)
  const ptB = RectPoint(c, 0)
  const ptC = PolarPoint(b, adjA)
  return Triangle.FromPoints(ptA, ptB, ptC)
}
