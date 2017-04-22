const { sin, cos, asin, acos, sqrt, PI } = Math;

export function ABCfromabc(a, b, c) {
  const C = acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
  const A = a2froma1s1s2(C, c, a);
  const B = PI - A - C;
  return [A, B, C];
}

export function ABcfromabC(a, b, C) {
  const c2 = (a * a) + (b * b) - (2 * a * b * cos(C));
  const c = sqrt(c2);
  const B = a2froma1s1s2(C, c, b);
  const A = PI - B - C;
  return [A, B, c];
}

export function BcCfromabA(a, b, A) {
  const B = a2froma1s1s2(A, a, b);
  const C = PI - A - B;
  const c = s2froms1a1a2(a, A, C);
  return [B, c, C];
}

export function bcCfromaAB(a, A, B) {
  const C = PI - A - B;
  const b = s2froms1a1a2(a, A, B);
  const c = s2froms1a1a2(a, A, C);
  return [b, c, C];
}

function a2froma1s1s2(a1, s1, s2) {
  return asin(s2 * sin(a1) / s1);
}

function s2froms1a1a2(s1, a1, a2) {
  return s1 * sin(a2) / sin(a1);
}
