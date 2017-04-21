import Triangle, { canInferTriangle } from './Triangle';
import { RectPoint, PolarPoint } from './Point';

const a = RectPoint(0, 0);
const b = RectPoint(1, 0);
const c = PolarPoint(1, Math.PI / 3);

const sss = { ab: 1, ac: 1, bc: 1 };
const ssa = { a, ab: 1, ac: 1 };
const saa = { a, b, ab: 1 };
const aaa = { a, b, c };

describe('Triangle', () => {
  it('Has a FromPoints constructor', () => {
    expect(Triangle.FromPoints(a, b, c)).toBeInstanceOf(Triangle);
  });

  describe('FromMetrics constructor', () => {
    it('Works with three sides', () => {
      expect(Triangle.FromMetrics(sss)).toBeInstanceOf(Triangle);
    });
  });
});

describe('Triangle Functions', () => {
  describe('canInferTriangle', () => {
    it('Can infer from 3 sides', () => {
      expect(canInferTriangle(sss)).toBeTruthy();
    });

    it('Can infer from 2 sides and 1 angle', () => {
      expect(canInferTriangle(ssa)).toBeTruthy();
    });

    it('Can\'t infer from 3 angles and no sides', () => {
      expect(canInferTriangle(aaa)).toBeFalsy();
    });
  });
});
