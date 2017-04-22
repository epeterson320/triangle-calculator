import Triangle from './Triangle';
import { RectPoint, PolarPoint } from './Point';

const c = 1;
const b = 2;
const a = Math.sqrt(3);
const A = Math.PI / 3;
const B = Math.PI / 2;
const C = Math.PI / 6;

const ptA = RectPoint(0, 0);
const ptB = RectPoint(c, 0);
const ptC = PolarPoint(b, A);

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

    it('Throws an error if not provided with enough metrics', () => {
      expect(() => Triangle.FromMetrics({ A, B, C })).toThrow();
      expect(() => Triangle.FromMetrics({ A, a, B: 0 })).toThrow();
      expect(() => Triangle.FromMetrics({ A, b, B: 0 })).toThrow();
      expect(() => Triangle.FromMetrics({ b, c })).toThrow();
    });

    it('Treats metrics with value 0 as if they were not specified', () => {
      expect(() => Triangle.FromMetrics({
        A: 0, B: 0, C: 0, a: 0, b: 0, c: 0,
      })).toThrow();
    });
  });
});
