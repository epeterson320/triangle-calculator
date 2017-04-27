import { canInferAll, inferMeasurements } from './triangleInfo';

const { abs, sqrt, sin, PI } = Math;
const delta = 1e-6;

const c = 1;
const b = 2;
const a = sqrt(3);
const A = PI / 3;
const B = PI / 2;
const C = PI / 6;

/**
 * Returns true if the measurements are all defined and they describe a
 * geometrically valid triangle. Returns false otherwise.
 */
function isValid(m) {
  const { a, b, c, A, B, C } = m; // eslint-disable-line no-shadow
  return !!a && !!b && !!c && !!A && !!B && !!C
    && (a + b > c) && (a + c > b) && (b + c > a)
    && abs(sin(A) / a - sin(B) / b) < delta
    && abs(sin(A) / a - sin(C) / c) < delta;
}

describe('canInferAll', () => {
  it('Can infer from 3 sides', () => {
    expect(canInferAll({ a, b, c })).toBe(true);
  });

  it('Can infer from 2 sides and 1 angle', () => {
    expect(canInferAll({ a, b, A })).toBe(true);
  });

  it('Can\'t infer from 3 angles and no sides', () => {
    expect(canInferAll({ A, B, C })).toBe(false);
  });
});

describe('inferMeasurements', () => {
  it('Can infer 3rd angle from incomplete measurements', () => {
    expect(inferMeasurements({ A, B }).C).toBeCloseTo(C);
    expect(inferMeasurements({ A, B: 0, C }).B).toBeCloseTo(B);
  });

  it('Works with three sides', () => {
    expect(isValid(inferMeasurements({ a, b, c }))).toBeTruthy();
  });

  it('Works with 2 sides and 1 common angle', () => {
    expect(isValid(inferMeasurements({ a, b, C }))).toBeTruthy();
    expect(isValid(inferMeasurements({ a, c, B }))).toBeTruthy();
    expect(isValid(inferMeasurements({ b, c, A }))).toBeTruthy();
  });

  it('Works with 2 sides and 1 uncommon angle', () => {
    expect(isValid(inferMeasurements({ a, b, A }))).toBeTruthy();
    expect(isValid(inferMeasurements({ a, c, C }))).toBeTruthy();
    expect(isValid(inferMeasurements({ b, c, C }))).toBeTruthy();
  });

  it('Works with 2 angles and 1 side', () => {
    expect(isValid(inferMeasurements({ A, B, a }))).toBeTruthy();
    expect(isValid(inferMeasurements({ A, B, b }))).toBeTruthy();
    expect(isValid(inferMeasurements({ A, C, a }))).toBeTruthy();
    expect(isValid(inferMeasurements({ A, C, b }))).toBeTruthy();
    expect(isValid(inferMeasurements({ B, C, a }))).toBeTruthy();
    expect(isValid(inferMeasurements({ B, C, c }))).toBeTruthy();
  });
});
