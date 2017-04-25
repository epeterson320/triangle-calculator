import test from 'tape';
import { RectPoint } from './Point';
import Line from './LineSegment';

const origin = RectPoint(0, 0);
const unitX = RectPoint(1, 0);

const ANG_45 = Math.PI / 4;
const ANG_90 = Math.PI / 2;
const ANG_180 = Math.PI;
const ANG_360 = Math.PI * 2;

const xEqY = Line.SlopeIntercept(1, 0);
const xEq0 = Line.PointAngle(origin, ANG_90);
const yEq4 = Line.SlopeIntercept(0, 4);

test('Line', (tg) => {
  tg.test('Has a PointPoint constructor', (t) => {
    t.ok(Line.PointPoint(origin, unitX) instanceof Line);
    t.ok(new Line.PointPoint(origin, unitX) instanceof Line);
    t.end();
  });

  tg.test('Has a PointAngle constructor', (t) => {
    t.ok(Line.PointAngle(origin, ANG_180) instanceof Line);
    t.ok(new Line.PointAngle(origin, ANG_180) instanceof Line);
    t.end();
  });

  tg.test('Has a PointSlope constructor', (t) => {
    t.ok(Line.PointAngle(origin, 4) instanceof Line);
    t.ok(new Line.PointAngle(origin, 4) instanceof Line);
    t.end();
  });

  tg.test('Has a SlopeIntercept constructor', (t) => {
    t.ok(Line.SlopeIntercept(4, -4) instanceof Line);
    t.ok(new Line.SlopeIntercept(4, -4) instanceof Line);
    t.end();
  });

  tg.test('Intersect', (intersectTG) => {
    intersectTG.test('Gets the right coords', (t) => {
      const p = xEqY.intersect(yEq4);
      t.inDelta(p.x, 4);
      t.inDelta(p.y, 4);
      t.end();
    });

    intersectTG.test('Intersects vertical lines', (t) => {
      const p = xEqY.intersect(xEq0);
      t.inDelta(p.x, 0);
      t.inDelta(p.y, 0);
      t.end();
    });

    intersectTG.test('Intersects vertical and horizontal lines', (t) => {
      const p1 = xEq0.intersect(yEq4);
      const p2 = yEq4.intersect(xEq0);
      t.inDelta(p1.x, 0);
      t.inDelta(p1.y, 4);
      t.inDelta(p2.x, 0);
      t.inDelta(p2.y, 4);
      t.end();
    });
  });

  tg.test('Point At X gets the right coords', (t) => {
    t.inDelta(xEqY.pointAtX(4).y, 4);
    t.end();
  });

  tg.test('Point At Y Gets the right coords', (t) => {
    t.inDelta(xEqY.pointAtY(4).x, 4);
    t.end();
  });

  tg.test('Equality', (eqTG) => {
    eqTG.test('Compares identical lines with separate constructors', (t) => {
      const l1 = Line.SlopeIntercept(1, 0);
      const l2 = Line.PointAngle(origin, ANG_45);
      t.ok(l1.equals(l2));
      t.end();
    });

    eqTG.test('Compares vertical lines correctly', (t) => {
      const l1 = Line.SlopeIntercept(Infinity, 4);
      const l2 = new Line.PointAngle(origin, ANG_90);
      t.ok(l1.equals(l2));
      t.end();
    });

    eqTG.test('Compares lines with different # rotations correctly', (t) => {
      const l1 = Line.PointAngle(origin, ANG_45);
      const l2 = Line.PointAngle(origin, ANG_45 + ANG_360);
      t.ok(l1.equals(l2));

      const l3 = Line.PointAngle(origin, ANG_90);
      const l4 = Line.PointAngle(origin, ANG_90 + ANG_360);
      t.ok(l3.equals(l4));
      t.end();
    });
  });
});
