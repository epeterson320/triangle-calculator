import Point from './Point';

const { PI, sqrt } = Math;

const ANG_0 = 0;
const ANG_30 = PI / 6;
const ANG_45 = PI / 4;
const ANG_60 = PI / 3;
const ANG_90 = PI / 2;
const ANG_180 = PI;

const expectedProps = ['x', 'y', 'angle', 'r', 'moveXY', 'movePolar'];

describe('Point.XY', () => {
  it('Can be created with the `new` keyword', () => {
    const p = new Point.XY(0, 0);
    expectedProps.forEach((prop) => {
      expect(p[prop]).toBeDefined();
    });
  });

  it('Can be created without the `new` keyword', () => {
    const p = Point.XY(0, 0);
    expectedProps.forEach((prop) => {
      expect(p[prop]).toBeDefined();
    });
  });

  it('Has correct angle', () => {
    expect(Point.XY(1, 1).angle).toBeCloseTo(ANG_45);
  });

  it('Avoids divide by 0 when computing angle', () => {
    const p1 = Point.XY(0, 0);
    expect(p1.angle).toBeGreaterThanOrEqual(ANG_0);
    expect(p1.angle).toBeLessThanOrEqual(ANG_180);

    expect(Point.XY(0, 1).angle).toBeCloseTo(ANG_90);
  });

  it('Has correct r', () => {
    expect(Point.XY(3, 4).r).toBeCloseTo(5);
    expect(Point.XY(5, 12).r).toBeCloseTo(13);
  });

  it('Can be translated with x and y', () => {
    const p = Point.XY(0, 4);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(4);
    expect(q.y).toBeCloseTo(3);
  });

  it('Can be translated with polar coords', () => {
    const p = Point.XY(2, 1);
    const q = p.movePolar(ANG_90 + ANG_45, sqrt(2));
    expect(q.x).toBeCloseTo(1);
    expect(q.y).toBeCloseTo(2);
  });
});

describe('Point.Polar', () => {
  it('Can be created with the `new` keyword', () => {
    const p = new Point.Polar(0, 0);
    expectedProps.forEach((prop) => {
      expect(p[prop]).toBeDefined();
    });
  });

  it('Can be created without the `new` keyword', () => {
    const p = Point.Polar(0, 0);
    expectedProps.forEach((prop) => {
      expect(p[prop]).toBeDefined();
    });
  });

  it('Has correct x and y', () => {
    expect(Point.Polar(ANG_30, 2).y).toBeCloseTo(1);
    expect(Point.Polar(ANG_60, 2).x).toBeCloseTo(1);
  });

  it('Can be translated with x and y', () => {
    const p = Point.Polar(0, 4);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(8);
    expect(q.y).toBeCloseTo(-1);
  });

  it('Can be translated with polar coords', () => {
    const p = Point.Polar(ANG_30, 2);
    const q = p.movePolar(-ANG_30, 2);
    expect(q.x).toBeCloseTo(sqrt(3) * 2);
    expect(q.y).toBeCloseTo(0);
  });
});
