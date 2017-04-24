import { RectPoint, PolarPoint, Point } from './Point';

const { PI, sqrt } = Math;

const ANG_0 = 0;
const ANG_30 = PI / 6;
const ANG_45 = PI / 4;
const ANG_60 = PI / 3;
const ANG_90 = PI / 2;
const ANG_180 = PI;
const ANG_360 = 2 * PI;

describe('RectPoint', () => {
  it('Can be created with the `new` keyword', () => {
    const p = new RectPoint(0, 0);
    expect(p).toBeInstanceOf(Point);
    expect(p).toBeInstanceOf(RectPoint);
  });

  it('Can be created without the `new` keyword', () => {
    const p = RectPoint(0, 0);
    expect(p).toBeInstanceOf(Point);
    expect(p).toBeInstanceOf(RectPoint);
  });

  it('Throws an error if constructed with non-number parameters', () => {
    expect(() => { RectPoint(0, undefined); }).toThrow();
    expect(() => { RectPoint('0', 4); }).toThrow();
  });

  it('Has correct angle', () => {
    expect(RectPoint(1, 1).angle).toBeCloseTo(ANG_45);
  });

  it('Avoids divide by 0 when computing angle', () => {
    const p1 = RectPoint(0, 0);
    expect(p1.angle).toBeGreaterThanOrEqual(ANG_0);
    expect(p1.angle).toBeLessThanOrEqual(ANG_180);

    expect(RectPoint(0, 1).angle).toBeCloseTo(ANG_90);
  });

  it('Has correct r', () => {
    expect(RectPoint(3, 4).r).toBeCloseTo(5);
    expect(RectPoint(5, 12).r).toBeCloseTo(13);
  });

  it('Can be translated with x and y', () => {
    const p = RectPoint(0, 4);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(4);
    expect(q.y).toBeCloseTo(3);
  });

  it('Can be translated with polar coords', () => {
    const p = RectPoint(2, 1);
    const q = p.movePolar(ANG_90 + ANG_45, sqrt(2));
    expect(q.x).toBeCloseTo(1);
    expect(q.y).toBeCloseTo(2);
  });

  it('Tests equality correctly', () => {
    expect(RectPoint(2, 1).equals(RectPoint(2, 1))).toBeTruthy();
    expect(RectPoint(1, 1).equals(PolarPoint(sqrt(2), ANG_45)))
      .toBeTruthy();
  });
});

describe('PolarPoint', () => {
  it('Can be created with the `new` keyword', () => {
    const p = new PolarPoint(0, 0);
    expect(p).toBeInstanceOf(Point);
    expect(p).toBeInstanceOf(PolarPoint);
  });

  it('Can be created without the `new` keyword', () => {
    const p = PolarPoint(0, 0);
    expect(p).toBeInstanceOf(Point);
    expect(p).toBeInstanceOf(PolarPoint);
  });

  it('Throws an error if created with non-number parameters', () => {
    expect(() => { PolarPoint(0); }).toThrow();
    expect(() => { PolarPoint('0', ANG_30); }).toThrow();
  });

  it('Has correct x and y', () => {
    expect(PolarPoint(2, ANG_30).y).toBeCloseTo(1);
    expect(PolarPoint(2, ANG_60).x).toBeCloseTo(1);
  });

  it('Can be translated with x and y', () => {
    const p = PolarPoint(4, 0);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(8);
    expect(q.y).toBeCloseTo(-1);
  });

  it('Can be translated with polar coords', () => {
    const p = PolarPoint(2, ANG_30);
    const q = p.movePolar(-ANG_30, 2);
    expect(q.x).toBeCloseTo(sqrt(3) * 2);
    expect(q.y).toBeCloseTo(0);
  });

  it('Tests equality correctly', () => {
    expect(PolarPoint(2, 1).equals(PolarPoint(2, 1))).toBeTruthy();
    expect(PolarPoint(sqrt(2), ANG_45).equals(RectPoint(1, 1)))
      .toBeTruthy();
  });

  it('Tests equality with multiple rotations correctly', () => {
    expect(PolarPoint(2, 0).equals(PolarPoint(2, ANG_360))).toBeTruthy();
    expect(PolarPoint(2, ANG_45).equals(PolarPoint(2, ANG_45 + ANG_360)))
      .toBeTruthy();
  });
});
