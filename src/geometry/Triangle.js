import { RectPoint, PolarPoint } from './Point'
import Circle from './Circle'
import Line from './LineSegment'

const { max, PI } = Math
const ANG_90 = PI / 2
const ANG_60 = PI / 3

export default function Triangle () { /* Base Prototype */ }

Object.defineProperty(Triangle.prototype, 'circumcenter', {
  get: function get () {
    return Circle(this.a, this.b, this.c).center
  }
})

Object.defineProperty(Triangle.prototype, 'minBoundingCircle', {
  get: function get () {
    if (this.A > ANG_90) return this.bc.midpoint
    if (this.B > ANG_90) return this.ac.midpoint
    if (this.C > ANG_90) return this.ab.midpoint
    return this.circumcenter
  }
})

Object.defineProperty(Triangle.prototype, 'viewbox', {
  get: function get () {
    const m = this.minBoundingCircle
    const r = max( // radius of minimum bounding circle
      Line.PointPoint(m, this.a).distance,
      Line.PointPoint(m, this.b).distance)

    const hs = r * 1.40 // half the side length of viewbox
    return {
      xl: m.x - hs,
      xr: m.x + hs,
      yb: m.y - hs,
      yt: m.y + hs
    }
  }
})

Object.defineProperty(Triangle.prototype, 'orthocenter', {
  get: function get () {
    const alt1 = Line.PointPerpendicular(this.a, this.bc)
    const alt2 = Line.PointPerpendicular(this.b, this.ac)
    return alt1.intersect(alt2)
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

Object.defineProperty(Triangle.prototype, 'centroid', {
  get: function get () {
    return Line.PointPoint(this.a, this.bc.midpoint)
      .intersect(Line.PointPoint(this.b, this.ac.midpoint))
  }
})

function is60 (angle) {
  return angle - ANG_60 < 0.00001 && angle - ANG_60 > -0.00001
}

Object.defineProperty(Triangle.prototype, 'eulerLine', {
  get: function get () {
    if (is60(this.A) && is60(this.B) && is60(this.C)) return null
    return Line.PointPoint(this.circumcenter, this.orthocenter)
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
  t.A = t.ac.angle - t.ab.angle
  t.B = t.ba.angle - t.bc.angle
  t.C = t.cb.angle - t.ca.angle
  t.p = t.ab.distance + t.ac.distance + t.bc.distance
  const labelOffset = t.p * 0.05

  t.label = {
    a: t.bc.midpoint.movePolar(t.bc.angle - ANG_90, labelOffset),
    b: t.ac.midpoint.movePolar(t.ca.angle - ANG_90, labelOffset),
    c: t.ab.midpoint.movePolar(t.ab.angle - ANG_90, labelOffset)
  }

  return t
}

Triangle.FromMetrics = function FromMetrics ({ a, b, c, A, B, C }) {
  if (!a || !b || !c || !A || !B || !C) {
    throw new Error('Not enough metrics specified')
  }
  const ptA = RectPoint(0, 0)
  const ptB = RectPoint(c, 0)
  const ptC = PolarPoint(b, A)
  return Triangle.FromPoints(ptA, ptB, ptC)
}
