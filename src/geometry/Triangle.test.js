import Triangle, { canInferTriangle } from './Triangle';
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
    });
  });
});

describe('Triangle Functions', () => {
  describe('canInferTriangle', () => {
    it('Can infer from 3 sides', () => {
      expect(canInferTriangle({ a, b, c })).toBeTruthy();
    });

    it('Can infer from 2 sides and 1 angle', () => {
      expect(canInferTriangle({ a, b, A })).toBeTruthy();
    });

    it('Can\'t infer from 3 angles and no sides', () => {
      expect(canInferTriangle({ A, B, C })).toBeFalsy();
    });
  });
});
