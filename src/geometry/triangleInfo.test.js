import { canInferAll, inferMeasurements, getErrors } from './triangleInfo'
import * as Texts from '../texts'
import { DEG, RAD } from './Metric'

const { abs, sqrt, sin, PI } = Math
const delta = 1e-6

const c = '1'
const b = '2'
const a = sqrt(3).toString()
const A = (PI / 3).toString()
const B = (PI / 2).toString()
const C = (PI / 6).toString()

/**
 * Passes if the measurements are all defined and they describe a
 * geometrically valid triangle. Fails otherwise.
 */
expect.extend({
  toBeValidTriangle (m) {
    const unit = m.angleUnit || RAD
    const a = parseFloat(m.a)
    const b = parseFloat(m.b)
    const c = parseFloat(m.c)
    let A = parseFloat(m.A)
    let B = parseFloat(m.B)
    let C = parseFloat(m.C)
    if (unit === DEG) {
      A = A / 180 * PI
      B = B / 180 * PI
      C = C / 180 * PI
    }

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
    expect(inferMeasurements({ A, B }).C).toBeCloseTo(parseFloat(C))
    expect(inferMeasurements({ A, B: '', C }).B).toBeCloseTo(parseFloat(B))
  })

  it('Returns the input when given invalid input', () => {
    expect(inferMeasurements({ A: 90, B: 90, angleUnit: DEG }))
      .toEqual({ A: 90, B: 90, angleUnit: DEG })
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

  it('Works with degrees', () => {
    const actual = inferMeasurements({ A: 90, B: 60, a: 2, angleUnit: DEG })
    const expected = {
      A: 90,
      B: 60,
      C: 30,
      a: 2,
      b: sqrt(3),
      c: 1,
      angleUnit: DEG
    }
    expect.assertions(7)
    expect(actual.angleUnit).toBe(expected.angleUnit)
    Object.keys(expected)
      .filter(k => typeof expected[k] === 'number')
      .forEach((key) => { expect(actual[key]).toBeCloseTo(expected[key]) })
  })
})

describe('getErrors', () => {
  it('Returns null when there are no errors', () => {
    expect(getErrors({})).toBe(null)
  })

  it('Does not treat the empty string as an error', () => {
    expect(getErrors({ a: '', A: '' })).toBe(null)
  })

  it('Flags input that can\'t be parsed into a number', () => {
    expect(getErrors({ a: 'Hello' })).toEqual({ a: Texts.CANT_PARSE })
  })

  it('Flags sides that are too short (3 sides)', () => {
    expect(getErrors({ a: '50', b: '7', c: '7' }))
      .toEqual({ b: Texts.SIDE_TOO_SHORT, c: Texts.SIDE_TOO_SHORT })
  })

  it('Flags sides that are too short (2 sides 1 angle)', () => {
    expect(getErrors({ A: '1.5708', b: '10', a: '1' }))
      .toEqual({ a: Texts.SIDE_TOO_SHORT })
  })

  it('Flags angles that add up to 180 or more', () => {
    expect(getErrors({ A: '1.5708', B: '1.5708' }))
      .toEqual({ A: Texts.ANGLES_GE180, B: Texts.ANGLES_GE180 })
  })

  it('Flags angles that are not between 0 and 180, exclusive', () => {
    expect(getErrors({ A: '180', angleUnit: DEG }).A).toEqual(Texts.ANGLE_OOB_DEG)
    expect(getErrors({ A: '3.15', angleUnit: RAD }).A).toEqual(Texts.ANGLE_OOB_RAD)
    expect(getErrors({ A: '0', angleUnit: RAD }).A).toEqual(Texts.ANGLE_OOB_RAD)
    expect(getErrors({ A: '-0.2', angleUnit: RAD }).A).toEqual(Texts.ANGLE_OOB_RAD)
  })
})
