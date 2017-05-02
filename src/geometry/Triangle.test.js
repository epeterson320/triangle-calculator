import Triangle from './Triangle'
import { RectPoint, PolarPoint } from './Point'

const { sqrt, max, min, PI } = Math

// A 30-60-90 triangle for various tests.
const ptA = RectPoint(0, 0)
const ptB = RectPoint(1, 0)
const ptC = PolarPoint(sqrt(3), PI / 2)
const t306090 = Triangle.FromPoints(ptA, ptB, ptC)

const equilateral10 = Triangle.FromPoints(
  RectPoint(0, 0),
  RectPoint(10, 0),
  RectPoint(5, sqrt(3) * 5)
)

describe('Triangle', () => {
  it('Has a FromPoints constructor', () => {
    expect(Triangle.FromPoints(ptA, ptB, ptC)).toBeInstanceOf(Triangle)
  })

  it('Has a FromMetrics constructor', () => {
    expect(Triangle.FromMetrics({ a: 3, b: 4, c: 5 })).toBeInstanceOf(Triangle)
  })

  it('Throws an error if not provided with enough metrics', () => {
    expect(() => Triangle.fromMetrics({ A: PI / 3, B: PI / 2, C: PI / 6 })).toThrow()
    expect(() => Triangle.fromMetrics({ A: PI / 3, a: 2, B: 0 })).toThrow()
    expect(() => Triangle.fromMetrics({ A: PI / 3, b: 2, B: 0 })).toThrow()
    expect(() => Triangle.fromMetrics({ b: 2, c: 3 })).toThrow()
  })

  it('Should have a correct circumcenter', () => {
    const exp = RectPoint(0.5, sqrt(3) / 2)
    expect(t306090.circumcenter.equals(exp)).toBeTruthy()
  })

  describe('Viewbox', () => {
    it('Should have a viewbox', () => {
      expect(t306090.viewbox).toBeDefined()
    })

    it('Should be square', () => {
      const { xl, xr, yt, yb } = t306090.viewbox
      expect(xr - xl).toBeCloseTo(yt - yb)
    })

    it('Should contain the triangle', () => {
      const { xl, xr, yt, yb } = t306090.viewbox;
      [t306090.a, t306090.b, t306090.c].forEach((pt) => {
        expect(pt.x).toBeGreaterThan(xl)
        expect(pt.x).toBeLessThan(xr)
        expect(pt.y).toBeGreaterThan(yb)
        expect(pt.y).toBeLessThan(yt)
      })
    })

    it('Viewport is not too big', () => {
      const { a, b, c } = t306090 // eslint-disable-line no-shadow
      const { xl, xr, yt, yb } = t306090.viewbox
      const tWidth = max(a.x, b.x, c.x) - min(a.x, b.x, c.x)
      const tHeight = max(a.y, b.y, c.y) - min(a.y, b.y, c.y)
      const vbWidth = xr - xl
      const vbHeight = yt - yb
      expect(max(tWidth / vbWidth, tHeight / vbHeight)).toBeGreaterThan(0.5)
    })
  })

  describe('Label Coords', () => {
    it('Gets decent coords for sides of an equilateral triangle', () => {
      const expa = RectPoint(7.5 + 1.5 * sqrt(3), 2.5 * sqrt(3) + 1.5)
      expect(equilateral10.label.a.equals(expa)).toBe(true)

      const expb = RectPoint(2.5 - 1.5 * sqrt(3), 2.5 * sqrt(3) + 1.5)
      expect(equilateral10.label.b.equals(expb)).toBe(true)

      const expc = RectPoint(5, -3)
      expect(equilateral10.label.c.equals(expc)).toBe(true)
    })

    it('Gets decent coords for angles of an equilateral triangle', () => {
      const expa = RectPoint(7.5 + 1.5 * sqrt(3), 2.5 * sqrt(3) + 1.5)
      expect(equilateral10.label.a.equals(expa)).toBe(true)

      const expb = RectPoint(2.5 - 1.5 * sqrt(3), 2.5 * sqrt(3) + 1.5)
      expect(equilateral10.label.b.equals(expb)).toBe(true)

      const expc = RectPoint(5, -3)
      expect(equilateral10.label.c.equals(expc)).toBe(true)
    })
  })
})
