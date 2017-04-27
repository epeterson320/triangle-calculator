import { ABCfromabc, ABcfromabC, BcCfromabA, bcfromaABC } from './trigLaws';

const C = Math.PI / 6;
const B = Math.PI / 3;
const A = Math.PI / 2;
const a = 2;
const b = Math.sqrt(3);
const c = 1;

describe('Law of cosines', () => {
  it('Finds the angles from 3 sides', () => {
    const actual = ABCfromabc(a, b, c);
    expect(actual[0]).toBeCloseTo(A);
    expect(actual[1]).toBeCloseTo(B);
    expect(actual[2]).toBeCloseTo(C);
  });

  it('Finds the third side from 2 sides with a common angle', () => {
    const actual = ABcfromabC(a, b, C);
    expect(actual[0]).toBeCloseTo(A);
    expect(actual[1]).toBeCloseTo(B);
    expect(actual[2]).toBeCloseTo(c);
  });
});

describe('Law of sines', () => {
  it('Finds the measurements from 2 sides with an uncommon angle', () => {
    const actual = BcCfromabA(a, b, A);
    expect(actual[0]).toBeCloseTo(B);
    expect(actual[1]).toBeCloseTo(c);
    expect(actual[2]).toBeCloseTo(C);
  });

  it('Finds the measurements from 3 angles and any side', () => {
    const actual = bcfromaABC(a, A, B, C);
    expect(actual[0]).toBeCloseTo(b);
    expect(actual[1]).toBeCloseTo(c);
  });
});
