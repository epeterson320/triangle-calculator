import {
  fromSSAc,
  fromSSS,
  fromSSAuc,
  fromSAA,
} from './trigLaws';

const C = Math.PI / 6;
const B = Math.PI / 3;
const A = Math.PI / 2;
const a = 2;
const b = Math.sqrt(3);
const c = 1;

describe('Law of cosines', () => {
  it('Finds the angles from 3 sides', () => {
    const expected = [A, B, C];
    const actual = fromSSS(a, b, c);
    actual.forEach((angle, i) => {
      expect(angle).toBeCloseTo(expected[i]);
    });
  });

  it('Finds the third side from 2 sides with a common angle', () => {
    expect(fromSSAc(a, b, C)).toBeCloseTo(c);
  });
});

describe('Law of sines', () => {
  it('Finds the measurements from 2 sides with an uncommon angle', () => {
    const actual = fromSSAuc(a, b, A);
    const expected = { a, b, c, A, B, C };
    Object.keys(expected).forEach((key) => {
      expect(actual[key]).toBeCloseTo(expected[key]);
    });
  });

  it('Finds the measurements from 2-3 angles and any side', () => {
    const actual = fromSAA(a, A, B);
    const expected = { a, b, c, A, B, C };
    Object.keys(expected).forEach((key) => {
      expect(actual[key]).toBeCloseTo(expected[key]);
    });
  });
});
