import { RectPoint } from './Point'
import Line from './LineSegment'

const origin = RectPoint(0, 0)
const unitX = RectPoint(1, 0)

const ANG_45 = Math.PI / 4
const ANG_90 = Math.PI / 2
const ANG_180 = Math.PI
const ANG_360 = Math.PI * 2

const xEqY = Line.SlopeIntercept(1, 0)
const xEq0 = Line.PointAngle(origin, ANG_90)
const yEq4 = Line.SlopeIntercept(0, 4)

describe('Line', () => {
  it('Has a PointPoint constructor', () => {
    expect(Line.PointPoint(origin, unitX)).toBeInstanceOf(Line)
    expect(new Line.PointPoint(origin, unitX)).toBeInstanceOf(Line)
  })

  it('Has a PointAngle constructor', () => {
    expect(Line.PointAngle(origin, ANG_180)).toBeInstanceOf(Line)
    expect(new Line.PointAngle(origin, ANG_180)).toBeInstanceOf(Line)
  })

  it('Has a PointSlope constructor', () => {
    expect(Line.PointAngle(origin, 4)).toBeInstanceOf(Line)
    expect(new Line.PointAngle(origin, 4)).toBeInstanceOf(Line)
  })

  it('Has a SlopeIntercept constructor', () => {
    expect(Line.SlopeIntercept(4, -4)).toBeInstanceOf(Line)
    expect(new Line.SlopeIntercept(4, -4)).toBeInstanceOf(Line)
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

  it('Point At X gets the right coords', () => {
    expect(xEqY.pointAtX(4).y).toBeCloseTo(4)
  })

  it('Point At Y Gets the right coords', () => {
    expect(xEqY.pointAtY(4).x).toBeCloseTo(4)
  })

  describe('Equality', () => {
    it('Compares identical lines with separate constructors', () => {
      const l1 = Line.SlopeIntercept(1, 0)
      const l2 = Line.PointAngle(origin, ANG_45)
      expect(l1.equals(l2)).toBeTruthy()
    })

    it('Compares vertical lines correctly', () => {
      const l1 = Line.SlopeIntercept(Infinity, 4)
      const l2 = new Line.PointAngle(origin, ANG_90)
      expect(l1.equals(l2)).toBeTruthy()
    })

    it('Compares lines with different # rotations correctly', () => {
      const l1 = Line.PointAngle(origin, ANG_45)
      const l2 = Line.PointAngle(origin, ANG_45 + ANG_360)
      expect(l1.equals(l2)).toBeTruthy()

      const l3 = Line.PointAngle(origin, ANG_90)
      const l4 = Line.PointAngle(origin, ANG_90 + ANG_360)
      expect(l3.equals(l4)).toBeTruthy()
    })
  })
})
