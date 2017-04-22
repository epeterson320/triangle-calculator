const { sin, cos, asin, acos, sqrt, PI } = Math;

// 3 Sides
export function ABCfromabc(a, b, c) {
  const C = acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
  const A = a2froma1s1s2(C, c, a);
  const B = PI - A - C;
  return [A, B, C];
}

// 2 Sides 1 common angle
export function ABcfromabC(a, b, C) {
  const c2 = (a * a) + (b * b) - (2 * a * b * cos(C));
  const c = sqrt(c2);
  const B = a2froma1s1s2(C, c, b);
  const A = PI - B - C;
  return [A, B, c];
}

// 2 Sides 1 uncommon angle
export function BcCfromabA(a, b, A) {
  const B = a2froma1s1s2(A, a, b);
  const C = PI - A - B;
  const c = s2froms1a1a2(a, A, C);
  return [B, c, C];
}

// 1 Side & 3 angles
export function bcfromaABC(a, A, B, C) {
  const b = s2froms1a1a2(a, A, B);
  const c = s2froms1a1a2(a, A, C);
  return [b, c];
}

function a2froma1s1s2(a1, s1, s2) {
  return asin(s2 * sin(a1) / s1);
}

function s2froms1a1a2(s1, a1, a2) {
  return s1 * sin(a2) / sin(a1);
}
