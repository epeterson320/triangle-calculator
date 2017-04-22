export function canInferTriangle(known) {
  const numSides = !!known.c + !!known.a + !!known.b;
  const numAngles = !!known.A + !!known.B + !!known.C;
  return (numSides + numAngles >= 3) && (numSides >= 1);
}

export function assumeMetrics() {
  throw new Error('TODO');
}
