export function fromSSAc(s1, s2, a3) {
  const s3sq = (s1 * s1) + (s2 * s2) - (2 * s1 * s2 * Math.cos(a3));
  const s3 = Math.sqrt(s3sq);
  return s3;
}

export function fromSSS(a, b, c) {
  const C = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
  const A = Math.asin(a * Math.sin(C) / c);
  const B = Math.PI - A - C;
  return [A, B, C];
}

export function fromSSAuc() {
}

export function fromSAA() {
}
