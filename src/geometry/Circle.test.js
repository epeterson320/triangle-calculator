import Circle from './Circle';
import { RectPoint } from './Point';

describe('Circle', () => {
  it('Can be created with cx, cy, r', () => {
    expect(new Circle(4, 4, 4)).toBeInstanceOf(Circle);
  });

  it('Can be created with C, r', () => {
    expect(new Circle(RectPoint(4, 4), 4)).toBeInstanceOf(Circle);
  });

  it('Can be created from three points on the edge', () => {
    const unit = new Circle(RectPoint(1, 0), RectPoint(0, 1), RectPoint(-1, 0));
    expect(unit.center.equals(RectPoint(0, 0))).toBe(true);
    expect(unit.radius).toBeCloseTo(1);
  });

  it('Has a center', () => {
    expect(Circle(3, 4, 2).center.equals(RectPoint(3, 4))).toBe(true);
  });

  it('Has a radius', () => {
    expect(Circle(3, 4, 4).radius).toBeCloseTo(4);
  });

  it('Contains points', () => {
    const unit = Circle(0, 0, 1);
    expect(unit.contains(RectPoint(0.5, 0.5))).toBe(true);
    expect(unit.contains(RectPoint(1.0, 0.5))).toBe(false);
  });
});
