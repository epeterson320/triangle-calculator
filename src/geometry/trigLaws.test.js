import {
  ABCfromabc,
  ABcfromabC,
  BcCfromabA,
  bcfromaABC,
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
    ABCfromabc(a, b, c)
      .forEach((angle, i) => { expect(angle).toBeCloseTo(expected[i]); });
  });

  it('Finds the third side from 2 sides with a common angle', () => {
    const expected = [A, B, c];
    ABcfromabC(a, b, C)
      .forEach((metric, i) => { expect(metric).toBeCloseTo(expected[i]); });
  });
});

describe('Law of sines', () => {
  it('Finds the measurements from 2 sides with an uncommon angle', () => {
    const actual = BcCfromabA(a, b, A);
    const expected = [B, c, C];
    Object.keys(expected)
      .forEach((key) => { expect(actual[key]).toBeCloseTo(expected[key]); });
  });

  it('Finds the measurements from 3 angles and any side', () => {
    const actual = bcfromaABC(a, A, B, C);
    const expected = [b, c];
    Object.keys(expected)
      .forEach((key) => { expect(actual[key]).toBeCloseTo(expected[key]); });
  });
});
