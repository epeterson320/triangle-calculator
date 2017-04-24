import Triangle from './Triangle';
import { RectPoint, PolarPoint } from './Point';

const { sqrt, max, min, PI } = Math;

const c = 1;
const b = sqrt(3);
const a = 2;
const A = PI / 2;
const B = PI / 3;
const C = PI / 6;

const ptA = RectPoint(0, 0);
const ptB = RectPoint(c, 0);
const ptC = PolarPoint(b, A);

// A 30-60-90 triangle for various tests.
const t306090 = Triangle.FromPoints(ptA, ptB, ptC);

describe('Triangle', () => {
  it('Has a FromPoints constructor', () => {
    expect(Triangle.FromPoints(ptA, ptB, ptC)).toBeInstanceOf(Triangle);
  });

  describe('FromMetrics constructor', () => {
    it('Works with three sides', () => {
      expect(Triangle.FromMetrics({ a, b, c })).toBeInstanceOf(Triangle);
    });

    it('Works with 2 sides and 1 common angle', () => {
      expect(Triangle.FromMetrics({ a, b, C })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ a, c, B })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ b, c, A })).toBeInstanceOf(Triangle);
    });

    it('Works with 2 sides and 1 uncommon angle', () => {
      expect(Triangle.FromMetrics({ a, b, A })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ a, c, C })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ b, c, C })).toBeInstanceOf(Triangle);
    });

    it('Works with 2 angles and 1 side', () => {
      expect(Triangle.FromMetrics({ A, B, a })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ A, B, b })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ A, C, a })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ A, C, b })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ B, C, a })).toBeInstanceOf(Triangle);
      expect(Triangle.FromMetrics({ B, C, c })).toBeInstanceOf(Triangle);
    });

    it('Treats metrics with value 0 as if they were not specified', () => {
      expect(() => Triangle.FromMetrics({
        A: 0, B: 0, C: 0, a: 0, b: 0, c: 0,
      })).toThrow();
    });

    it('Throws an error if not provided with enough metrics', () => {
      expect(() => Triangle.FromMetrics({ A, B, C })).toThrow();
      expect(() => Triangle.FromMetrics({ A, a, B: 0 })).toThrow();
      expect(() => Triangle.FromMetrics({ A, b, B: 0 })).toThrow();
      expect(() => Triangle.FromMetrics({ b, c })).toThrow();
    });

    it('Should have a correct circumcenter', () => {
      const exp = RectPoint(0.5, sqrt(3) / 2);
      expect(t306090.circumcenter.equals(exp)).toBeTruthy();
    });

    describe('Viewbox', () => {
      it('Should have a viewbox', () => {
        expect(t306090.viewbox).toBeDefined();
      });

      it('Should be square', () => {
        const { xl, xr, yt, yb } = t306090.viewbox;
        expect(xr - xl).toBeCloseTo(yt - yb);
      });

      it('Should contain the triangle', () => {
        const { xl, xr, yt, yb } = t306090.viewbox;
        [t306090.a, t306090.b, t306090.c].forEach((pt) => {
          expect(pt.x).toBeGreaterThan(xl);
          expect(pt.x).toBeLessThan(xr);
          expect(pt.y).toBeGreaterThan(yb);
          expect(pt.y).toBeLessThan(yt);
        });
      });

      it('Should not be too big', () => {
        const { a, b, c } = t306090; // eslint-disable-line no-shadow
        const { xl, xr, yt, yb } = t306090.viewbox;
        const tWidth = max(a.x, b.x, c.x) - min(a.x, b.x, c.x);
        const tHeight = max(a.y, b.y, c.y) - min(a.y, b.y, c.y);
        const vbWidth = xr - xl;
        const vbHeight = yt - yb;
        expect(max(tWidth / vbWidth, tHeight / vbHeight))
          .toBeGreaterThan(0.5);
      });
    });
  });
});
