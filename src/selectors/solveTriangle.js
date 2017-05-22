import { DEG } from '../constants'

const { sin, cos, asin, acos, sqrt, PI } = Math

export const NonNumberInput = 'Enter a number'
export const SideTooShort = 'Side too short'
export const SideTooLong = 'Side too long'
export const AngleSumTooLarge = 'Angles must add up to less than 180 degrees'
export const InvalidAngle = 'Angles must be between 0 and 180 degrees'

export default function solve (inputs) {
  const { numericInputs, parseErrors } = parseInputs(inputs)
  const { validInputs, numericErrors } = validateInputs(numericInputs)

  const errors = Object.assign({}, numericErrors, parseErrors)

  const { computed, alternate } = (Object.keys(errors).length === 0)
    ? computePossible(validInputs)
    : { computed: { A: 0, B: 0, C: 0, a: 0, b: 0, c: 0 }, alternate: null }

  const isSolved =
    !!(computed.A && computed.B && computed.C &&
    computed.a && computed.b && computed.c)

  return { isSolved, computed, alternate, errors }
}

// INTERNALS (Not directly unit-tested, but covered in tests for solve())

function parseInputs (texts) {
  const errors = {}
  const numeric = {
    a: parseFloat(texts.a, 10),
    b: parseFloat(texts.b, 10),
    c: parseFloat(texts.c, 10),
    A: parseFloat(texts.A, 10),
    B: parseFloat(texts.B, 10),
    C: parseFloat(texts.C, 10)
  }

  if (texts.a && isNaN(numeric.a)) errors.a = NonNumberInput
  if (texts.b && isNaN(numeric.b)) errors.b = NonNumberInput
  if (texts.c && isNaN(numeric.c)) errors.c = NonNumberInput
  if (texts.A && isNaN(numeric.A)) errors.A = NonNumberInput
  if (texts.B && isNaN(numeric.B)) errors.B = NonNumberInput
  if (texts.C && isNaN(numeric.C)) errors.C = NonNumberInput

  if (texts.unit === DEG) {
    numeric.A = numeric.A * PI / 180
    numeric.B = numeric.B * PI / 180
    numeric.C = numeric.C * PI / 180
  }

  return {
    numericInputs: numeric,
    parseErrors: errors
  }
}

function validateInputs ({ a, b, c, A, B, C }) {
  const errors = {}

  // Angles not between 0 and 180 degrees
  if (A <= 0 || A >= PI) {
    errors.A = InvalidAngle
  }
  if (B <= 0 || B >= PI) {
    errors.B = InvalidAngle
  }
  if (C <= 0 || C >= PI) {
    errors.C = InvalidAngle
  }

  // Impossible sides (3 sides given)
  if (a && b && c) {
    if (a + b <= c) {
      a = b = c = 0
      errors.a = errors.b = SideTooShort
      errors.c = SideTooLong
    } else if (a + c <= b) {
      a = b = c = 0
      errors.a = errors.c = SideTooShort
      errors.b = SideTooLong
    } else if (b + c <= a) {
      a = b = c = 0
      errors.b = errors.c = SideTooShort
      errors.a = SideTooLong
    }
  }

  // Too-short sides (2 sides + uncommon angle)
  if (sin(A) * b / a > 1) {
    a = 0
    errors.a = SideTooShort
    errors.b = SideTooLong
  } else if (sin(A) * c / a > 1) {
    a = 0
    errors.a = SideTooShort
    errors.c = SideTooLong
  } else if (sin(B) * a / b > 1) {
    b = 0
    errors.b = SideTooShort
    errors.a = SideTooLong
  } else if (sin(B) * c / b > 1) {
    b = 0
    errors.b = SideTooShort
    errors.c = SideTooLong
  } else if (sin(C) * a / c > 1) {
    c = 0
    errors.c = SideTooShort
    errors.a = SideTooLong
  } else if (sin(C) * b / c > 1) {
    c = 0
    errors.c = SideTooShort
    errors.b = SideTooLong
  }

  // 2-Angle combinations that add up to >= 180
  if (A + B >= PI) {
    A = B = 0
    errors.A = errors.B = AngleSumTooLarge
  }
  if (A + C >= PI) {
    A = C = 0
    errors.A = errors.C = AngleSumTooLarge
  }
  if (B + C >= PI) {
    B = C = 0
    errors.B = errors.C = AngleSumTooLarge
  }

  return {
    validInputs: { a: a || 0, b: b || 0, c: c || 0, A: A || 0, B: B || 0, C: C || 0 },
    numericErrors: errors
  }
}

function computePossible ({ a, b, c, A, B, C }) {
  let numAngles = !!A + !!B + !!C
  let alternate = null
  let a2, b2, c2, A2, B2, C2
  if (numAngles === 2) {
    A = A || PI - B - C
    B = B || PI - A - C
    C = C || PI - A - B
    numAngles++
  }

  // 3 Sides
  if (a && b && c) {
    [A, B, C] = ABCfromabc(a, b, c)
  // 1 side & 3 angles
  } else if (numAngles === 3) {
    if (a) { [b, c] = bcfromaABC(a, A, B, C) }
    if (b) { [a, c] = bcfromaABC(b, B, A, C) }
    if (c) { [b, a] = bcfromaABC(c, C, B, A) }
  // 2 sides & 1 common angle
  } else if (a && b && C) {
    [A, B, c] = ABcfromabC(a, b, C)
  } else if (a && c && B) {
    [A, C, b] = ABcfromabC(a, c, B)
  } else if (b && c && A) {
    [B, C, a] = ABcfromabC(b, c, A)
  // 2 sides & 1 uncommon angle
  } else if (a && b && A) {
    [B, c, C, B2, c2, C2] = BcCfromabA(a, b, A)
  } else if (a && b && B) {
    [A, c, C, A2, c2, C2] = BcCfromabA(b, a, B)
  } else if (a && c && A) {
    [C, b, B, C2, b2, B2] = BcCfromabA(a, c, A)
  } else if (a && c && C) {
    [A, b, B, A2, b2, B2] = BcCfromabA(c, a, C)
  } else if (b && c && B) {
    [C, a, A, C2, a2, A2] = BcCfromabA(b, c, B)
  } else if (b && c && C) {
    [B, a, A, B2, a2, A2] = BcCfromabA(c, b, C)
  }

  if (a2 || b2 || c2) {
    alternate = {
      a: a2 || a,
      b: b2 || b,
      c: c2 || c,
      A: A2 || A,
      B: B2 || B,
      C: C2 || C
    }
  }
  return {
    computed: { a, b, c, A, B, C },
    alternate
  }
}

// 3 Sides
export function ABCfromabc (a, b, c) {
  const C = acos(((a * a) + (b * b) - (c * c)) / (2 * a * b))
  const A = a2froma1s1s2(C, c, a)
  const B = PI - A - C
  return [A, B, C]
}

// 2 Sides 1 common angle
export function ABcfromabC (a, b, C) {
  const c2 = (a * a) + (b * b) - (2 * a * b * cos(C))
  const c = sqrt(c2)
  const B = a2froma1s1s2(C, c, b)
  const A = PI - B - C
  return [A, B, c]
}

// 2 Sides 1 uncommon angle
// TODO: handle ambiguous
export function BcCfromabA (a, b, A) {
  const B = a2froma1s1s2(A, a, b)
  const C = PI - A - B
  const c = s2froms1a1a2(a, A, C)
  if (a > b) {
    return [B, c, C, NaN, NaN, NaN]
  } else {
    const B2 = PI - B
    const C2 = PI - B2 - A
    const c2 = s2froms1a1a2(a, A, C2)
    return [B, c, C, B2, c2, C2]
  }
}

// 1 Side & 3 angles
export function bcfromaABC (a, A, B, C) {
  const b = s2froms1a1a2(a, A, B)
  const c = s2froms1a1a2(a, A, C)
  return [b, c]
}

function a2froma1s1s2 (a1, s1, s2) {
  return asin(s2 * sin(a1) / s1)
}

function s2froms1a1a2 (s1, a1, a2) {
  return s1 * sin(a2) / sin(a1)
}
