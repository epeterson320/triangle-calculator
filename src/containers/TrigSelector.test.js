import getSVGCoords from './TrigSelector';

function makeMeasurements(m) {
  return Object.assign({ a: 0, b: 0, c: 0, ab: 0, ac: 0, bc: 0 }, m);
}

describe('Trig Selector', () => {
  it('Returns a response in the right shape', () => {
    const { a, b, c } = getSVGCoords(makeMeasurements());
    [a, b, c].forEach((point) => {
      expect(point.x).toBeDefined();
      expect(point.y).toBeDefined();
    });
  });
  it('Makes assumptions when not enough data is provided');
  it('Throws errors when provided with bad data');

  describe('computes all measurements', () => {
    it('when given 3 sides');
    it('when given 2 sides and 1 angle'); // all 9 combinations
    it('when given 2 angles and 1 side'); // all 9 combinations
  });

  it('Converts measurements to cartesian coords');
  it('Normalizes cartesian coords to SVG coords');
});
