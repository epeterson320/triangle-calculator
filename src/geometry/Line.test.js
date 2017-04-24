import { RectPoint } from './Point';
import Line from './Line';

const origin = RectPoint(0, 0);
const unitX = RectPoint(1, 0);

const ANG_45 = Math.PI / 4;
const ANG_90 = Math.PI / 2;
const ANG_180 = Math.PI;
const ANG_360 = Math.PI * 2;

const xEqY = Line.SlopeIntercept(1, 0);
const xEq0 = Line.PointAngle(origin, ANG_90);
const yEq4 = Line.SlopeIntercept(0, 4);

describe('Line', () => {
  it('Has a PointPoint constructor', () => {
    expect(Line.PointPoint(origin, unitX)).toBeInstanceOf(Line);
    expect(new Line.PointPoint(origin, unitX)).toBeInstanceOf(Line);
  });

  it('Has a PointAngle constructor', () => {
    expect(Line.PointAngle(origin, ANG_180)).toBeInstanceOf(Line);
    expect(new Line.PointAngle(origin, ANG_180)).toBeInstanceOf(Line);
  });

  it('Has a PointSlope constructor', () => {
    expect(Line.PointAngle(origin, 4)).toBeInstanceOf(Line);
    expect(new Line.PointAngle(origin, 4)).toBeInstanceOf(Line);
  });

  it('Has a SlopeIntercept constructor', () => {
    expect(Line.SlopeIntercept(4, -4)).toBeInstanceOf(Line);
    expect(new Line.SlopeIntercept(4, -4)).toBeInstanceOf(Line);
  });

  describe('Intersect', () => {
    it('Gets the right coords', () => {
      const p = xEqY.intersect(yEq4);
      expect(p.x).toBeCloseTo(4);
      expect(p.y).toBeCloseTo(4);
    });

    it('Intersects vertical lines', () => {
      const p = xEqY.intersect(xEq0);
      expect(p.x).toBeCloseTo(0);
      expect(p.y).toBeCloseTo(0);
    });

    it('Intersects vertical and horizontal lines', () => {
      const p1 = xEq0.intersect(yEq4);
      const p2 = yEq4.intersect(xEq0);
      expect(p1.x).toBeCloseTo(0);
      expect(p1.y).toBeCloseTo(4);
      expect(p2.x).toBeCloseTo(0);
      expect(p2.y).toBeCloseTo(4);
    });
  });

  describe('Point At X', () => {
    it('Gets the right coords', () => {
      expect(xEqY.pointAtX(4).y).toBeCloseTo(4);
    });

    it('Throws an error for vertical lines', () => {
      expect(xEq0.pointAtX(3)).toThrow();
      expect(xEq0.pointAtX(4)).toThrow();
    });
  });

  describe('Point At Y', () => {
    it('Gets the right coords', () => {
      expect(xEqY.pointAtY(4).x).toBeCloseTo(4);
    });

    it('Throws an error for horizontal lines', () => {
      expect(yEq4.pointAtY(3)).toThrow();
      expect(yEq4.pointAtY(4)).toThrow();
    });
  });

  describe('Equality', () => {
    it('Compares mathematically identical lines with separate constructors correctly', () => {
      expect(Line.SlopeIntercept(1, 0)
        .equals(new Line.PointAngle(origin, ANG_45)))
        .toBeTruthy();
    });

    it('Compares vertical lines correctly', () => {
      expect(Line.SlopeIntercept(Infinity, 4)
        .equals(new Line.PointAngle(origin, ANG_90)))
        .toBeTruthy();
    });

    it('Compares lines with different # rotations correctly', () => {
      expect(Line.PointAngle(origin, ANG_45)
        .equals(Line.PointAngle(origin, ANG_45 + ANG_360)))
        .toBeTruthy();

      expect(Line.PointAngle(origin, ANG_90)
        .equals(Line.PointAngle(origin, ANG_90 + ANG_360)))
        .toBeTruthy();
    });
  });
});
