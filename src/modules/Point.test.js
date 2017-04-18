import { PointXY, PointPolar } from './coords';

const { PI, sqrt } = Math;

const ANG_0 = 0;
const ANG_30 = PI / 6;
const ANG_45 = PI / 4;
const ANG_60 = PI / 3;
const ANG_90 = PI / 2;
const ANG_180 = PI;

describe('PointXY', () => {
  it('Can be created with the `new` keyword', () => {
    expect(new PointXY(0, 0)).toBeInstanceOf(PointXY);
  });

  it('Can be created without the `new` keyword', () => {
    expect(PointXY(0, 0)).toBeInstanceOf(PointXY);
  });

  it('Has correct angle', () => {
    expect(PointXY(1, 1).angle).toBeCloseTo(ANG_45);
  });

  it('Avoids divide by 0 when computing angle', () => {
    const p1 = PointXY(0, 0);
    expect(p1.angle).toBeGreaterThanOrEqual(ANG_0);
    expect(p1.angle).toBeLessThanOrEqual(ANG_180);

    expect(PointXY(0, 1).angle).toBeCloseTo(ANG_90);
  });

  it('Has correct r', () => {
    expect(PointXY(3, 4).r).toBeCloseTo(5);
    expect(PointXY(5, 12).r).toBeCloseTo(13);
  });

  it('Can be translated with x and y', () => {
    const p = PointXY(0, 4);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(4);
    expect(q.y).toBeCloseTo(3);
  });

  it('Can be translated with polar coords', () => {
    const p = PointXY(2, 1);
    const q = p.movePolar(ANG_90 + ANG_45, sqrt(2));
    expect(q.x).toBeCloseTo(1);
    expect(q.y).toBeCloseTo(2);
  });
});

describe('PointPolar', () => {
  it('Can be created with the `new` keyword', () => {
    expect(new PointPolar(0, 0)).toBeInstanceOf(PointPolar);
  });

  it('Can be created without the `new` keyword', () => {
    expect(PointPolar(0, 0)).toBeInstanceOf(PointPolar);
  });

  it('Has correct x and y', () => {
    expect(PointPolar(ANG_30, 2).y).toBeCloseTo(1);
    expect(PointPolar(ANG_60, 2).x).toBeCloseTo(1);
  });

  it('Can be translated with x and y', () => {
    const p = PointPolar(0, 4);
    const q = p.moveXY(4, -1);
    expect(q.x).toBeCloseTo(8);
    expect(q.y).toBeCloseTo(-1);
  });

  it('Can be translated with polar coords', () => {
    const p = PointPolar(ANG_30, 2);
    const q = p.movePolar(-ANG_30, 2);
    expect(q.x).toBeCloseTo(sqrt(3) * 2);
    expect(q.y).toBeCloseTo(0);
  });
});
