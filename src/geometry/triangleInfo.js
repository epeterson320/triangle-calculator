export function canInferTriangle(known) {
  const numSides = !!known.c + !!known.a + !!known.b;
  const numAngles = !!known.A + !!known.B + !!known.C;
  return (numSides + numAngles >= 3) && (numSides >= 1);
}

// input known, preferences & priorities, always returns metrics
export function assumeMetrics() {
  throw new Error('TODO');
}

// input known, returns partial metrics
// for use with measurement form to show calculated stuff
export function interPartial() {
  throw new Error('TODO');
}
