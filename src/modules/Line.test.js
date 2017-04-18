import Point from './Point';
import Line from './Line';

const origin = Point.XY(0, 0);
const unitX = Point.XY(1, 0);

const xEqY = Line.SlopeIntercept(1, 0);
const yEq4 = Line.SlopeIntercept(0, 4);

function expectLine(obj) {
  ['m', 'angle', 'intersect', 'angleBisector', 'pointAtX', 'pointAtY'].forEach((prop) => {
    expect(obj[prop]).toBeDefined();
  });
}

function expectSamePoint(p, q) {
  expect(p.x).toBeCloseTo(q.x);
  expect(p.y).toBeCloseTo(q.y);
}

describe('Line', () => {
  it('Has a PointPoint constructor', () => {
    expectLine(Line.PointPoint(origin, unitX));
  });

  it('Has a PointAngle constructor', () => {
    expectLine(Line.PointAngle(origin, Math.PI));
  });

  it('Has a PointSlope constructor', () => {
    expectLine(Line.PointAngle(origin, 4));
  });

  it('Has a SlopeIntercept constructor', () => {
    expectLine(Line.SlopeIntercept(4, -4));
  });

  describe('Intersect', () => {
    it('Gets the right coords', () => {
      const p = xEqY.intersect(yEq4);
      expect(p.x).toBeCloseTo(4);
      expect(p.y).toBeCloseTo(4);
    });
  });

  describe('Angle Bisector', () => {
    it('Computes the angle', () => {
      const bisector = xEqY.angleBisector(yEq4);
      expect(bisector.angle).toBeCloseTo(Math.PI / 8);
    });

    it('Intersects both lines at the same point', () => {
      const bisector = xEqY.angleBisector(yEq4);
      const i1 = bisector.intersect(xEqY);
      const i2 = bisector.intersect(yEq4);
      const i3 = xEqY.intersect(yEq4);
      expectSamePoint(i1, i2);
      expectSamePoint(i1, i3);
    });
  });

  describe('Point At X', () => {
    it('Gets the right coords', () => {
      expect(xEqY.pointAtX(4).y).toBeCloseTo(4);
    });
  });

  describe('Point At Y', () => {
    it('Gets the right coords', () => {
      expect(xEqY.pointAtY(4).x).toBeCloseTo(4);
    });
  });
});