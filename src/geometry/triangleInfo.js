// Parameters in this module named 'm' are shorthand for 'measurements'
import * as trig from './trigLaws';

const { PI } = Math;

export function canInferAll(m) {
  const numSides = !!m.c + !!m.a + !!m.b;
  const numAngles = !!m.A + !!m.B + !!m.C;
  return (numSides + numAngles >= 3) && (numSides >= 1);
}

// input known, preferences & priorities, always returns metrics
export function assumeMeasurements() {
  throw new Error('TODO');
}

// input known, returns partial metrics
// for use with measurement form to show calculated stuff
export function inferMeasurements(m) {
  if (canInferAll(m)) {
    return inferAllMeasurements(m);
  }
  if (!!m.A + !!m.B + !!m.C === 2) {
    const A = m.A || PI - m.B - m.C;
    const B = m.B || PI - m.A - m.C;
    const C = m.C || PI - m.A - m.B;
    return Object.assign({}, m, { A, B, C });
  }
  return Object.assign({}, m);
}

function inferAllMeasurements(metrics) {
  let { a, b, c, A, B, C } = metrics;
  const numAngles = !!A + !!B + !!C;

  // 3 Sides
  if (a && b && c) {
    [A, B, C] = trig.ABCfromabc(a, b, c);
  // 1 side & 2 angles
  } else if (numAngles === 2) {
    A = A || (PI - B - C);
    B = B || (PI - A - C);
    C = C || (PI - A - B);
    if (a) { [b, c] = trig.bcfromaABC(a, A, B, C); }
    if (b) { [a, c] = trig.bcfromaABC(b, B, A, C); }
    if (c) { [b, a] = trig.bcfromaABC(c, C, B, A); }
  // 2 sides & 1 common angle
  } else if (a && b && C) {
    [A, B, c] = trig.ABcfromabC(a, b, C);
  } else if (a && c && B) {
    [A, C, b] = trig.ABcfromabC(a, c, B);
  } else if (b && c && A) {
    [B, C, a] = trig.ABcfromabC(b, c, A);
  // 2 sides & 1 uncommon angle
  } else if (a && b && A) {
    [B, c, C] = trig.BcCfromabA(a, b, A);
  } else if (a && b && B) {
    [A, c, C] = trig.BcCfromabA(b, a, B);
  } else if (a && c && A) {
    [C, b, B] = trig.BcCfromabA(a, c, A);
  } else if (a && c && C) {
    [A, b, B] = trig.BcCfromabA(c, a, C);
  } else if (b && c && B) {
    [C, a, A] = trig.BcCfromabA(b, c, B);
  } else if (b && c && C) {
    [B, a, A] = trig.BcCfromabA(c, b, C);
  }

  if (a && b && c && A && B && C) {
    return { a, b, c, A, B, C };
  }
  throw new Error('Not enough metrics specified');
}
