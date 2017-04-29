import { canInferAll, inferMeasurements } from './triangleInfo'

const { abs, sqrt, sin, PI } = Math
const delta = 1e-6

const c = 1
const b = 2
const a = sqrt(3)
const A = PI / 3
const B = PI / 2
const C = PI / 6

/**
 * Passes if the measurements are all defined and they describe a
 * geometrically valid triangle. Fails otherwise.
 */
expect.extend({
  toBeValidTriangle (m) {
    const { a, b, c, A, B, C } = m // eslint-disable-line no-shadow
    const pass = !!a && !!b && !!c && !!A && !!B && !!C &&
      (a + b > c) && (a + c > b) && (b + c > a) &&
      abs(sin(A) / a - sin(B) / b) < delta &&
      abs(sin(A) / a - sin(C) / c) < delta
    return (pass)
      ? { message: () => 'expected an invalid triangle', pass }
      : { message: () => 'expected a valid triangle', pass }
  }
})

describe('canInferAll', () => {
  it('Can infer from 3 sides', () => {
    expect(canInferAll({ a, b, c })).toBe(true)
  })

  it('Can infer from 2 sides and 1 angle', () => {
    expect(canInferAll({ a, b, A })).toBe(true)
  })

  it('Can\'t infer from 3 angles and no sides', () => {
    expect(canInferAll({ A, B, C })).toBe(false)
  })
})

describe('inferMeasurements', () => {
  it('Can infer 3rd angle from incomplete measurements', () => {
    expect(inferMeasurements({ A, B }).C).toBeCloseTo(C)
    expect(inferMeasurements({ A, B: 0, C }).B).toBeCloseTo(B)
  })

  it('Won\'t assume missing measurements', () => {
    expect(inferMeasurements({ A, B })).not.toBeValidTriangle()
  })

  it('Works with three sides', () => {
    expect(inferMeasurements({ a, b, c })).toBeValidTriangle()
  })

  it('Works with 2 sides and 1 common angle', () => {
    expect(inferMeasurements({ a, b, C })).toBeValidTriangle()
    expect(inferMeasurements({ a, c, B })).toBeValidTriangle()
    expect(inferMeasurements({ b, c, A })).toBeValidTriangle()
  })

  it('Works with 2 sides and 1 uncommon angle', () => {
    expect(inferMeasurements({ a, b, A })).toBeValidTriangle()
    expect(inferMeasurements({ a, c, C })).toBeValidTriangle()
    expect(inferMeasurements({ b, c, C })).toBeValidTriangle()
  })

  it('Works with 2 angles and 1 side', () => {
    expect(inferMeasurements({ A, B, a })).toBeValidTriangle()
    expect(inferMeasurements({ A, B, b })).toBeValidTriangle()
    expect(inferMeasurements({ A, C, a })).toBeValidTriangle()
    expect(inferMeasurements({ A, C, b })).toBeValidTriangle()
    expect(inferMeasurements({ B, C, a })).toBeValidTriangle()
    expect(inferMeasurements({ B, C, c })).toBeValidTriangle()
  })
})
