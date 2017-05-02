// Parameters in this module named 'm' are shorthand for 'measurements'
import * as trig from './trigLaws'
import * as Texts from '../texts'
import { DEG } from './Metric'

const { PI, sin } = Math

export function canInferAll (m) {
  const numSides = !!parseFloat(m.c) + !!parseFloat(m.a) + !!parseFloat(m.b)
  const numAngles = !!parseFloat(m.A) + !!parseFloat(m.B) + !!parseFloat(m.C)
  return (numSides + numAngles >= 3) && (numSides >= 1)
}

export function getErrors (m) {
  const errors = {}
  const given = {}
  const sides = ['a', 'b', 'c']
  const angles = ['A', 'B', 'C']

  // Invalid numbers
  sides.concat(angles)
    .filter(key => m[key] != null)
    .forEach(key => {
      const val = parseFloat(m[key])
      if (isNaN(val)) errors[key] = Texts.CANT_PARSE
      else given[key] = val
    })

  const { A, B, C, a, b, c } = given

  // Angles not between 0 and 180
  const isValidAngle = (m.angleUnit === DEG)
    ? (a) => a > 0 && a < 180
    : (a) => a > 0 && a < PI

  const msg = (m.angleUnit === DEG) ? Texts.ANGLE_OOB_DEG : Texts.ANGLE_OOB_RAD

  angles
    .filter(key => given[key] != null && !isValidAngle(given[key]))
    .forEach(key => { errors[key] = msg })

  // Too-short sides (3 sides given)
  if (a + b <= c) errors.a = errors.b = Texts.SIDE_TOO_SHORT
  if (a + c <= b) errors.a = errors.c = Texts.SIDE_TOO_SHORT
  if (b + c <= a) errors.b = errors.c = Texts.SIDE_TOO_SHORT

  // Too-short sides (2 sides + uncommon angle)
  if (sin(A) * b / a > 1) errors.a = Texts.SIDE_TOO_SHORT
  if (sin(A) * c / a > 1) errors.a = Texts.SIDE_TOO_SHORT
  if (sin(B) * a / b > 1) errors.b = Texts.SIDE_TOO_SHORT
  if (sin(B) * c / b > 1) errors.b = Texts.SIDE_TOO_SHORT
  if (sin(C) * a / c > 1) errors.c = Texts.SIDE_TOO_SHORT
  if (sin(C) * b / c > 1) errors.c = Texts.SIDE_TOO_SHORT

  // 2-Angle combinations that add up to >= 180
  const limit = m.angleUnit === DEG ? 180 : PI
  if (A + B >= limit) errors.A = errors.B = Texts.ANGLES_GE180
  if (A + C >= limit) errors.A = errors.C = Texts.ANGLES_GE180
  if (B + C >= limit) errors.B = errors.C = Texts.ANGLES_GE180

  return Object.keys(errors).length ? errors : null
}

// input known, preferences & priorities, always returns metrics
export function assumeMeasurements () {
  throw new Error('TODO')
}

// input known, returns partial metrics
// for use with measurement form to show calculated stuff
export function inferMeasurements (_m) {
  const m = {
    a: parseFloat(_m.a) || 0,
    b: parseFloat(_m.b) || 0,
    c: parseFloat(_m.c) || 0,
    A: parseFloat(_m.A) || 0,
    B: parseFloat(_m.B) || 0,
    C: parseFloat(_m.C) || 0,
    angleUnit: _m.angleUnit
  }

  if (canInferAll(m)) {
    return inferAllMeasurements(m)
  }
  if (!!m.A + !!m.B + !!m.C === 2) {
    const sum = (m.angleUnit === DEG) ? 180 : PI
    m.A = m.A || sum - m.B - m.C
    m.B = m.B || sum - m.A - m.C
    m.C = m.C || sum - m.A - m.B
  }
  return m
}

function inferAllMeasurements (metrics) {
  let { a, b, c, A, B, C } = metrics
  const numAngles = !!A + !!B + !!C

  // 3 Sides
  if (a && b && c) {
    [A, B, C] = trig.ABCfromabc(a, b, c)
  // 1 side & 2 angles
  } else if (numAngles === 2) {
    A = A || (PI - B - C)
    B = B || (PI - A - C)
    C = C || (PI - A - B)
    if (a) { [b, c] = trig.bcfromaABC(a, A, B, C) }
    if (b) { [a, c] = trig.bcfromaABC(b, B, A, C) }
    if (c) { [b, a] = trig.bcfromaABC(c, C, B, A) }
  // 2 sides & 1 common angle
  } else if (a && b && C) {
    [A, B, c] = trig.ABcfromabC(a, b, C)
  } else if (a && c && B) {
    [A, C, b] = trig.ABcfromabC(a, c, B)
  } else if (b && c && A) {
    [B, C, a] = trig.ABcfromabC(b, c, A)
  // 2 sides & 1 uncommon angle
  } else if (a && b && A) {
    [B, c, C] = trig.BcCfromabA(a, b, A)
  } else if (a && b && B) {
    [A, c, C] = trig.BcCfromabA(b, a, B)
  } else if (a && c && A) {
    [C, b, B] = trig.BcCfromabA(a, c, A)
  } else if (a && c && C) {
    [A, b, B] = trig.BcCfromabA(c, a, C)
  } else if (b && c && B) {
    [C, a, A] = trig.BcCfromabA(b, c, B)
  } else if (b && c && C) {
    [B, a, A] = trig.BcCfromabA(c, b, C)
  }

  if (a && b && c && A && B && C) {
    return { a, b, c, A, B, C }
  }
  throw new Error('Not enough metrics specified')
}
