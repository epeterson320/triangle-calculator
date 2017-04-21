export function fromSSAc() {
}

export function fromSSS(s1, s2, s3) {
  const a3 = Math.acos(((s1 * s1) + (s2 * s2) - (s3 * s3)) / (2 * s1 * s2));
  const a2 = Math.asin(s2 * Math.sin(a3) / s3);
  const a1 = Math.PI - a2 - a3;
  return [a1, a2, a3];
}

export function fromSSAuc() {
}

export function fromSAA() {
}
