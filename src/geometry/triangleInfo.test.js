import { canInferTriangle } from './triangleInfo';

const c = 1;
const b = 2;
const a = Math.sqrt(3);
const A = Math.PI / 3;
const B = Math.PI / 2;
const C = Math.PI / 6;

describe('Triangle helper functions', () => {
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
