import {
  fromSSAc,
  fromSSS,
  fromSSAuc,
  fromSAA,
} from './trigLaws';

const A_30 = Math.PI / 6;
const A_60 = Math.PI / 3;
const A_90 = Math.PI / 2;

describe('Law of cosines', () => {
  it('Finds the angles from 3 sides', () => {
    const expected = [A_30, A_90, A_60];
    const actual = fromSSS(1, 2, Math.sqrt(3));
    actual.forEach((angle, i) => {
      expect(angle).toBeCloseTo(expected[i]);
    });
  });

  it('Finds the third side from 2 sides with a common angle');
});

describe('Law of sines', () => {
  it('Finds the measurements from 2 sides with an uncommon angle');
  it('Finds the measurements from 2-3 angles and any side');
});
