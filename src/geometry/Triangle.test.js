import Triangle from './Triangle'
import { RectPoint, PolarPoint } from './Point'
import { DEG } from '../constants'
import solve from '../selectors/solveTriangle'

const { sqrt, max, min, PI } = Math

const origin = RectPoint(0, 0)

// A 30-60-90 triangle for various tests.
const ptA = origin
const ptB = RectPoint(1, 0)
const ptC = PolarPoint(sqrt(3), PI / 2)
const t306090 = Triangle.FromPoints(ptA, ptB, ptC)

const equilateral10 = Triangle.FromPoints(
  origin,
  RectPoint(10, 0),
  RectPoint(5, sqrt(3) * 5)
)

const eqCenter = RectPoint(5, 5 * sqrt(3) / 3)

function tFromPartial (metrics) {
  return Triangle.FromMetrics(solve(metrics).computed)
}

describe('Triangle', () => {
  it('Has a FromPoints constructor', () => {
    expect(Triangle.FromPoints(ptA, ptB, ptC)).toBeInstanceOf(Triangle)
  })

  it('Has a FromMetrics constructor', () => {
    const t = Triangle.FromMetrics({
      a: 1,
      b: 1,
      c: 1,
      A: PI / 3,
      B: PI / 3,
      C: PI / 3
    })
    expect(t).toBeInstanceOf(Triangle)
  })

  it('Throws an error if not provided with all metrics', () => {
    expect(() => Triangle.FromMetrics({ b: 2, c: 3 })).toThrow()
  })

  it('Should have a correct circumcenter', () => {
    const exp = RectPoint(0.5, sqrt(3) / 2)
    expect(t306090.circumcenter.equals(exp)).toBeTruthy()

    expect(equilateral10.circumcenter.equals(eqCenter)).toBe(true)
  })

  it('Has an incenter', () => {
    // I'm just going off of
    // wikipedia.org/wiki/Incircle_and_excircles_of_a_triangle#Cartesian_coordinates_of_the_incenter
    const t = t306090
    const a = t.bc.distance
    const b = t.ac.distance
    const c = t.ab.distance
    const A = t.a
    const B = t.b
    const C = t.c
    const x = (a * A.x + b * B.x + c * C.x) / (a + b + c)
    const y = (a * A.y + b * B.y + c * C.y) / (a + b + c)
    expect(t.incenter.equals(RectPoint(x, y))).toBeTruthy()
  })

  it('Has an incircle (equilateral)', () => {
    expect(equilateral10.incenter.equals(eqCenter)).toBe(true)
    expect(equilateral10.inradius).toBeCloseTo(5 * sqrt(3) / 3)
  })

  it('Has an incenter (30-60-90)', () => {
    const t = tFromPartial({ a: 2, b: sqrt(3), c: 1 })
    const exp = RectPoint((sqrt(3) - 1) / 2, (sqrt(3) - 1) / 2)
    expect(t.incenter.equals(exp)).toBe(true)
  })

  it('Has an inradius (30-60-90)', () => {
    const t = tFromPartial({ a: 2, b: sqrt(3), c: 1 })
    expect(t.inradius).toBeCloseTo((sqrt(3) - 1) / 2)
  })

  it('Has an orthocenter (equilateral)', () => {
    expect(equilateral10.orthocenter.equals(eqCenter)).toBe(true)
  })

  it('Has an orthocenter (30-60-90)', () => {
    expect(t306090.orthocenter.equals(origin)).toBe(true)
  })

  it('Has a centroid (equilateral)', () => {
    expect(equilateral10.centroid.equals(eqCenter)).toBe(true)
  })

  it('Has a centroid (30-60-90)', () => {
    expect(t306090.centroid.equals(RectPoint(1 / 3, sqrt(3) / 3))).toBe(true)
  })

  it('Has Euler\'s line', () => {
    expect(t306090.eulerLine.contains(origin, { extend: true })).toBe(true)
    expect(t306090.eulerLine.contains(RectPoint(0.5, sqrt(3) / 2), { extend: true })).toBe(true)
  })

  it('Doesn\'t have Euler\'s line (equilateral)', () => {
    expect(equilateral10.eulerLine).toBe(null)
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

    it('Viewport is not too big for obtuse triangles', () => {
      const t = tFromPartial({ A: 170, b: 3, c: 3, unit: DEG })
      const { a, b, c } = t // eslint-disable-line no-shadow
      const { xl, xr, yt, yb } = t.viewbox
      const tWidth = max(a.x, b.x, c.x) - min(a.x, b.x, c.x)
      const tHeight = max(a.y, b.y, c.y) - min(a.y, b.y, c.y)
      const vbWidth = xr - xl
      const vbHeight = yt - yb
      expect(max(tWidth / vbWidth, tHeight / vbHeight)).toBeGreaterThan(0.5)
    })
  })

  describe('Label Coords', () => {
    it('Gets decent coords for sides of an equilateral triangle', () => {
      const expa = RectPoint(7.5 + 0.75 * sqrt(3), 2.5 * sqrt(3) + 0.75)
      expect(equilateral10.label.a.equals(expa)).toBe(true)

      const expb = RectPoint(2.5 - 0.75 * sqrt(3), 2.5 * sqrt(3) + 0.75)
      expect(equilateral10.label.b.equals(expb)).toBe(true)

      const expc = RectPoint(5, -1.5)
      expect(equilateral10.label.c.equals(expc)).toBe(true)
    })
  })
})
