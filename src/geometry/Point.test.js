import test from 'tape';
import { RectPoint, PolarPoint, Point } from './Point';

const { PI, sqrt } = Math;

const ANG_0 = 0;
const ANG_30 = PI / 6;
const ANG_45 = PI / 4;
const ANG_60 = PI / 3;
const ANG_90 = PI / 2;
const ANG_180 = PI;
const ANG_360 = 2 * PI;

test('RectPoint', (tg) => {
  tg.test('Can be created with `new` keyword', (t) => {
    const p = new RectPoint(0, 0);
    t.ok(p instanceof Point);
    t.ok(p instanceof RectPoint);
    t.end();
  });

  tg.test('Can be created without the `new` keyword', (t) => {
    const p = RectPoint(0, 0);
    t.ok(p instanceof Point);
    t.ok(p instanceof RectPoint);
    t.end();
  });

  tg.test('Throws an error if constructed with non-number parameters', (t) => {
    t.throws(() => { RectPoint(0, undefined); });
    t.throws(() => { RectPoint('0', 4); });
    t.end();
  });

  tg.test('Has correct angle', (t) => {
    t.inDelta(RectPoint(1, 1).angle, ANG_45);
    t.end();
  });

  tg.test('Avoids divide by 0 when computing angle', (t) => {
    const p = RectPoint(0, 0);
    t.ok(p.angle >= ANG_0);
    t.ok(p.angle <= ANG_180);
    t.inDelta(RectPoint(0, 1).angle, ANG_90);
    t.end();
  });

  tg.test('Has correct r', (t) => {
    t.inDelta(RectPoint(3, 4).r, 5);
    t.inDelta(RectPoint(5, 12).r, 13);
    t.end();
  });

  tg.test('Can be translated with x and y', (t) => {
    const p = RectPoint(0, 4);
    const q = p.moveXY(4, -1);
    t.inDelta(q.x, 4);
    t.inDelta(q.y, 3);
    t.end();
  });

  tg.test('Can be translated with polar coords', (t) => {
    const p = RectPoint(2, 1);
    const q = p.movePolar(ANG_90 + ANG_45, sqrt(2));
    t.inDelta(q.x, 1);
    t.inDelta(q.y, 2);
    t.end();
  });

  tg.test('Tests equality correctly', (t) => {
    t.ok(RectPoint(2, 1).equals(RectPoint(2, 1)));
    t.ok(RectPoint(1, 1).equals(PolarPoint(sqrt(2), ANG_45)));
    t.end();
  });
});

test('PolarPoint', (tg) => {
  tg.test('Can be created with the `new` keyword', (t) => {
    const p = new PolarPoint(0, 0);
    t.ok(p instanceof Point);
    t.ok(p instanceof PolarPoint);
    t.end();
  });

  tg.test('Can be created without the `new` keyword', (t) => {
    const p = PolarPoint(0, 0);
    t.ok(p instanceof Point);
    t.ok(p instanceof PolarPoint);
    t.end();
  });

  tg.test('Throws an error if created with non-number parameters', (t) => {
    t.throws(() => { PolarPoint(0); });
    t.throws(() => { PolarPoint('0', ANG_30); });
    t.end();
  });

  tg.test('Has correct x and y', (t) => {
    t.inDelta(PolarPoint(2, ANG_30).y, 1);
    t.inDelta(PolarPoint(2, ANG_60).x, 1);
    t.end();
  });

  tg.test('Can be translated with x and y', (t) => {
    const p = PolarPoint(4, 0);
    const q = p.moveXY(4, -1);
    t.inDelta(q.x, 8);
    t.inDelta(q.y, -1);
    t.end();
  });

  tg.test('Can be translated with polar coords', (t) => {
    const p = PolarPoint(2, ANG_30);
    const q = p.movePolar(-ANG_30, 2);
    t.inDelta(q.x, 2 * sqrt(3));
    t.inDelta(q.y, 0);
    t.end();
  });

  tg.test('Tests equality correctly', (t) => {
    t.ok(PolarPoint(2, 1).equals(PolarPoint(2, 1)));
    t.ok(PolarPoint(sqrt(2), ANG_45).equals(RectPoint(1, 1)));
    t.end();
  });

  tg.test('Tests equality with multiple rotations correctly', (t) => {
    t.ok(PolarPoint(2, 0).equals(PolarPoint(2, ANG_360)));
    t.ok(PolarPoint(2, ANG_45).equals(PolarPoint(2, ANG_45 + ANG_360)));
    t.end();
  });
});
