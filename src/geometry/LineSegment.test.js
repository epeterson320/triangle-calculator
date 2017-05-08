import { RectPoint, PolarPoint, Point } from './Point'
import Line from './LineSegment'

const origin = RectPoint(0, 0)
const unitX = RectPoint(1, 0)

const PI = Math.PI
const ANG_45 = Math.PI / 4
const ANG_90 = Math.PI / 2
const ANG_180 = Math.PI
const ANG_360 = Math.PI * 2

const xEqY = Line.PointPoint(origin, RectPoint(10, 10))
const xEq0 = Line.PointPoint(origin, RectPoint(0, 10))
const yEq4 = Line.PointAngleDistance(RectPoint(0, 4), 0, 10)

function makeLine (x1 = 0, y1 = 0, x2 = 1, y2 = 0) {
  return Line.PointPoint(RectPoint(x1, y1), RectPoint(x2, y2))
}

describe('Line', () => {
  it('Has a PointPoint constructor', () => {
    expect(Line.PointPoint(origin, unitX)).toBeInstanceOf(Line)
    expect(new Line.PointPoint(origin, unitX)).toBeInstanceOf(Line)
  })

  it('Has a PointAngleDistance constructor', () => {
    expect(Line.PointAngleDistance(origin, ANG_45, 4.2)).toBeInstanceOf(Line)
    expect(new Line.PointAngleDistance(origin, ANG_180, 4.2)).toBeInstanceOf(Line)
  })

  describe('PointPerpendicular constructor', () => {
    it('Works with the point below the line', () => {
      const perp = makeLine(-1, 0, 1, 2)
      const point = RectPoint(1, 0)
      const line = Line.PointPerpendicular(point, perp)
      expect(line.point2.equals(RectPoint(0, 1))).toBe(true)
      expect(line.angle).toBeCloseTo(3 * PI / 4)
    })

    it('Works with the point above the line', () => {
      const perp = makeLine(-1, 0, 1, 2)
      const point = RectPoint(-1, 2)
      const line = Line.PointPerpendicular(point, perp)
      expect(line.point2.equals(RectPoint(0, 1))).toBe(true)
      expect(line.angle).toBeCloseTo(7 * PI / 4)
    })
  })

  describe('Intersect', () => {
    it('Gets the right coords', () => {
      const p = xEqY.intersect(yEq4)
      expect(p.x).toBeCloseTo(4)
      expect(p.y).toBeCloseTo(4)
    })

    it('Intersects vertical lines', () => {
      const p = xEqY.intersect(xEq0)
      expect(p.x).toBeCloseTo(0)
      expect(p.y).toBeCloseTo(0)
    })

    it('Intersects vertical and horizontal lines', () => {
      const p1 = xEq0.intersect(yEq4)
      const p2 = yEq4.intersect(xEq0)
      expect(p1.x).toBeCloseTo(0)
      expect(p1.y).toBeCloseTo(4)
      expect(p2.x).toBeCloseTo(0)
      expect(p2.y).toBeCloseTo(4)
    })
  })

  describe('Equality', () => {
    it('Compares identical lines with separate constructors', () => {
      const l1 = Line.PointPoint(origin, RectPoint(10.0, 0.0))
      const l2 = Line.PointAngleDistance(origin, 0, 10.0)
      expect(l1.equals(l2)).toBeTruthy()
    })

    it('Compares vertical lines correctly', () => {
      const l1 = Line.PointPoint(RectPoint(0, -1), RectPoint(0, 9))
      const l2 = new Line.PointAngleDistance(PolarPoint(1, -ANG_90), ANG_90, 10)
      expect(l1.equals(l2)).toBeTruthy()
    })

    it('Compares lines with different # rotations correctly', () => {
      const l1 = Line.PointAngleDistance(origin, ANG_45, 42)
      const l2 = Line.PointAngleDistance(origin, ANG_45 + ANG_360, 42)
      expect(l1.equals(l2)).toBeTruthy()

      const l3 = Line.PointAngleDistance(origin, ANG_90, -5)
      const l4 = Line.PointAngleDistance(origin, ANG_90 + ANG_360, -5)
      expect(l3.equals(l4)).toBeTruthy()
    })
  })

  it('Has a distance', () => {
    expect(Line.PointPoint(origin, RectPoint(3, 4)).distance).toBeCloseTo(5)
    expect(Line.PointAngleDistance(origin, 2, 60).distance).toBeCloseTo(60)
  })

  it('Has a midpoint', () => {
    const line = Line.PointPoint(RectPoint(0, 1), RectPoint(2, 3))
    expect(line.midpoint).toBeInstanceOf(Point)
    expect(line.midpoint.equals(RectPoint(1, 2))).toBe(true)
  })

  it('Has an angle', () => {
    const identity = Line.PointPoint(origin, RectPoint(40, 40))
    expect(identity.angle).toBeCloseTo(ANG_45)

    const horiz = Line.PointPoint(origin, RectPoint(3, 0))
    expect(horiz.angle).toBeCloseTo(0)

    const vert = Line.PointPoint(origin, RectPoint(0, 4))
    expect(vert.angle).toBeCloseTo(ANG_90)
  })

  it('Bisects other lines', () => {
    const bisector1 = makeLine().bisect(makeLine(0, 0, 1, 1))
    expect(bisector1.equals(Line.PointAngleDistance(origin, PI / 8, 1)))
      .toBe(true)

    const bisector2 = Line.PointAngleDistance(origin, -PI / 8, 1)
      .bisect(Line.PointAngleDistance(origin, 3 * PI / 8, 1))

    expect(bisector2.angle)
      .toBeCloseTo(Line.PointAngleDistance(origin, PI / 8, 1).angle)
  })

  it('Has the correct angle in every quadrant', () => {
    [0, 45, 90, 135, 180, 225, 270, 315, 360].forEach((deg) => {
      const angle = deg / 360 * 2 * PI
      const line = Line.PointPoint(origin, origin.movePolar(angle, 1))
      expect(line.angle).toBeCloseTo(angle)
    })
  })

  it('Contains points', () => {
    expect(xEqY.contains(RectPoint(4, 4))).toBe(true)
    expect(xEqY.contains(RectPoint(0, 0))).toBe(true)
    expect(xEqY.contains(RectPoint(-1, -1))).toBe(false)
  })

  it('Contains points when extended', () => {
    expect(xEqY.contains(RectPoint(100000, 100000), { extend: true })).toBe(true)
  })
})
