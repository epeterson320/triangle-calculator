import getSVGCoords, {
  computeAllMeasurements as computeAll,
  cartesianCoordsFromMeasurements as cartFromMeasurements,
  svgCoordsFromCartesian as svgFromCart,
} from './trigSelector';

const { PI, sqrt } = Math;

const EQ_ANG = PI / 3;
const RT_ANG = PI / 2;

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

  it('Makes assumptions when not enough data is provided', () => {
    const m = makeMeasurements({ ab: 40, ac: 60 });
    const { a, b, c } = getSVGCoords(m);

    const dx1 = a.x - b.x;
    const dy1 = a.y - b.y;
    const ab = sqrt((dx1 * dx1) + (dy1 * dy1));

    const dx2 = a.x - c.x;
    const dy2 = a.y - c.y;
    const ac = sqrt((dx2 * dx2) + (dy2 * dy2));
    expect(ab / ac).toBeCloseTo(40 / 60);
  });

  it('Throws errors when provided with bad data', () => {
    // Two right angles
    expect(makeMeasurements({ a: RT_ANG, b: RT_ANG })).toThrow();
  });

  describe('computes all measurements', () => {
    it('when given 3 sides', () => {
      const m345 = computeAll({ ab: 3, ac: 4, bc: 5 });
      expect(m345.a).toBe(RT_ANG);
      expect(m345.b + m345.c).toBeCloseTo(RT_ANG);

      const mEq = computeAll({ ab: 5, ac: 5, bc: 5 });
      [mEq.a, mEq.b, mEq.c].forEach(a => expect(a).toBeCloseTo(EQ_ANG));
    });

    it('when given 2 sides and 1 angle', () => {
      const mExp = { a: EQ_ANG, b: EQ_ANG, c: EQ_ANG, ab: 3, ac: 3, bc: 3 };
      // all 9 combinations
      const m1 = makeMeasurements({ ab: 3, ac: 3, a: EQ_ANG });
      const m2 = makeMeasurements({ ab: 3, ac: 3, b: EQ_ANG });
      const m3 = makeMeasurements({ ab: 3, ac: 3, c: EQ_ANG });
      const m4 = makeMeasurements({ ab: 3, bc: 3, a: EQ_ANG });
      const m5 = makeMeasurements({ ab: 3, bc: 3, b: EQ_ANG });
      const m6 = makeMeasurements({ ab: 3, bc: 3, c: EQ_ANG });
      const m7 = makeMeasurements({ ac: 3, bc: 3, a: EQ_ANG });
      const m8 = makeMeasurements({ ac: 3, bc: 3, b: EQ_ANG });
      const m9 = makeMeasurements({ ac: 3, bc: 3, c: EQ_ANG });
      [m1, m2, m3, m4, m5, m6, m7, m8, m9]
        .forEach((partialM) => {
          const m = computeAll(partialM);
          expect(m.a).toBeCloseTo(mExp.a);
          expect(m.b).toBeCloseTo(mExp.b);
          expect(m.c).toBeCloseTo(mExp.c);
          expect(m.ab).toBeCloseTo(mExp.ab);
          expect(m.ac).toBeCloseTo(mExp.ac);
          expect(m.bc).toBeCloseTo(mExp.bc);
        });
    });

    it('when given 2 angles and 1 side', () => {
      const mExp = { a: EQ_ANG, b: EQ_ANG, c: EQ_ANG, ab: 20, ac: 20, bc: 20 };
      // all 9 combinations
      const m1 = makeMeasurements({ ab: 20, a: EQ_ANG, b: EQ_ANG });
      const m2 = makeMeasurements({ ab: 20, a: EQ_ANG, c: EQ_ANG });
      const m3 = makeMeasurements({ ab: 20, b: EQ_ANG, c: EQ_ANG });
      const m4 = makeMeasurements({ ac: 20, a: EQ_ANG, b: EQ_ANG });
      const m5 = makeMeasurements({ ac: 20, a: EQ_ANG, c: EQ_ANG });
      const m6 = makeMeasurements({ ac: 20, b: EQ_ANG, c: EQ_ANG });
      const m7 = makeMeasurements({ bc: 20, a: EQ_ANG, b: EQ_ANG });
      const m8 = makeMeasurements({ bc: 20, a: EQ_ANG, c: EQ_ANG });
      const m9 = makeMeasurements({ bc: 20, b: EQ_ANG, c: EQ_ANG });
      [m1, m2, m3, m4, m5, m6, m7, m8, m9]
        .forEach((partialM) => {
          const m = computeAll(partialM);
          expect(m.a).toBeCloseTo(mExp.a);
          expect(m.b).toBeCloseTo(mExp.b);
          expect(m.c).toBeCloseTo(mExp.c);
          expect(m.ab).toBeCloseTo(mExp.ab);
          expect(m.ac).toBeCloseTo(mExp.ac);
          expect(m.bc).toBeCloseTo(mExp.bc);
        });
    });
  });

  it('Converts measurements to cartesian coords', () => {
    const m = { a: EQ_ANG, b: EQ_ANG, c: EQ_ANG, ab: 20, ac: 20, bc: 20 };
    const { a, b, c } = cartFromMeasurements(m);
    [[a, b], [a, c], [b, c]].forEach(([p, q]) => {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const l = sqrt((dx * dx) + (dy * dy));
      expect(l).toBeCloseTo(20);
    });
  });

  it('Normalizes cartesian coords to SVG coords', () => {
    const cart = {
      a: { x: -500, y: 2000 },
      b: { x: -500, y: 0 },
      c: { x: 500, y: 1000 },
    };

    const bounds = { w: 120, h: 120, pad: 10 };
    const svg = svgFromCart(cart, bounds);
    expect(svg).toEqual({
      a: { x: 10, y: 10 },
      b: { x: 10, y: 110 },
      c: { x: 60, y: 60 },
    });
  });
});
