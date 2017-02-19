const { sin, cos, asin, acos, min, max, PI } = Math;

const EQ_ANG = PI / 3;

/**
 * Returns coords for a triangle, (ax, ay, bx, by, cx, cy) given a set of
 * geometric info about the triangle's sides and angles.
 *
 * @param  {Object} measurements - sides and lengths. 0 means not defined
 * @return {Object}              x and y coords of points a, b, and c
 * @throws {Error} if it is given geometrically impossible measurements.
 */
export default function svgCoordsFromAnyMeasurements(anyMeasurements) {
  const enoughMeasurements = assumeMissingMeasurements(anyMeasurements);
  const allMeasurements = computeAllMeasurements(enoughMeasurements);
  const cartesianCoords = cartesianCoordsFromMeasurements(allMeasurements);
  const bounds = { w: 120, h: 120, pad: 20 };
  return svgCoordsFromCartesian(cartesianCoords, bounds);
}

/**
 * Takes a set of measurements, and if not enough data is given to describe a
 * triangle unambiguously, it will fill in a few more measurements until it is.
 */
export function assumeMissingMeasurements(m) {
  const nSidesDef = !!m.ab + !!m.ac + !!m.bc;
  const nAngDef = !!m.a + !!m.b + !!m.c;
  if (nSidesDef + nAngDef === 3 && nSidesDef > 1) return m;
  if (nSidesDef === 0 && nAngDef === 2) return assumeSide(m);
  return assumeMissingMeasurements(assumeAngle(m));
}

function assumeSide(m) {
  if (!m.ab) return Object.assign({}, m, { ab: 80 });
  if (!m.ac) return Object.assign({}, m, { ac: 80 });
  if (!m.bc) return Object.assign({}, m, { bc: 80 });
  return m;
}

function assumeAngle(m) {
  if (!m.a) return Object.assign({}, m, { a: EQ_ANG });
  if (!m.b) return Object.assign({}, m, { b: EQ_ANG });
  if (!m.c) return Object.assign({}, m, { c: EQ_ANG });
  return m;
}

export function computeAllMeasurements(m) {
  const nSidesDef = !!m.ab + !!m.ac + !!m.bc;
  const nAngDef = !!m.a + !!m.b + !!m.c;
  if (nSidesDef === 3) return from3Sides(m);
  if (nSidesDef === 2 && nAngDef === 1) return from2Sides1Ang(m);
  if (nSidesDef === 1 && nAngDef === 2) return from2Angles(m);
  throw new Error('Define 3 sides, 2 sides + 1 angle, or 1 side + 2 angles');
}

function from3Sides({ ab, ac, bc }) {
  // Law of cosines (textbook): c² = a² + b² - 2ab cos(C)
  // Here it is used to find C.
  const numr = (ab * ab) + (ac * ac) - (bc * bc);
  const denom = 2 * ab * ac;
  const a = acos(numr / denom);
  return { a, ab, ac };
}

function from2Angles(m) {
  const a = m.a || (PI - m.b - m.c);
  const b = m.b || (PI - m.a - m.c);
  const c = m.c || (PI - m.a - m.b);
  // law of sines ratio
  const ratio = (m.ab && (sin(c) / m.ab))
    || (m.ac && (sin(b) / m.ac))
    || (m.bc && (sin(a) / m.bc));

  const ab = sin(c) / ratio;
  const ac = sin(b) / ratio;
  const bc = sin(a) / ratio;
  return { a, b, c, ab, ac, bc };
}

function from2Sides1Ang(m) {
  if (!!m.a && !!m.ab && !!m.ac) {
    return m;
  } else if (!!m.c && !!m.ac && !!m.bc) {
    const ab = getThirdSide(m.ac, m.bc, m.c);
    return from3Sides(Object.assign({}, m, { ab }));
  } else if (!!m.b && !!m.ab && !!m.bc) {
    const ac = getThirdSide(m.ab, m.bc, m.b);
    return from3Sides(Object.assign({}, m, { ac }));
  }
  const m1 = getSecondAngle(m);
  return from2Angles(m1);
}

/** Get third side from 2 sides with a common angle (law of cosines) */
function getThirdSide(a, b, C) {
  return Math.sqrt((a * a) + (b * b) - (2 * a * b * Math.cos(C)));
}

/** Get second angle from 2 sides with an uncommon angle (law of sines) */
function getSecondAngle(m) {
  // law of sines: a ∕ (sin A) = b ∕ (sin B) = c ∕ (sin C)
  const ratio = (m.a && (sin(m.a) / m.bc))
    || (m.b && (sin(m.b) / m.ac))
    || (m.c && (sin(m.c) / m.ab));

  const a = m.a || asin(m.bc * ratio) || 0;
  const b = m.b || asin(m.ac * ratio) || 0;
  const c = m.c || asin(m.ab * ratio) || 0;
  return Object.assign({}, m, { a, b, c });
}

export function cartesianCoordsFromMeasurements(m) {
  return {
    a: { x: 0, y: 0 },
    b: { x: m.ab, y: 0 },
    c: { x: cos(m.a) * m.ac, y: sin(m.a) * m.ac },
  };
}

export function svgCoordsFromCartesian(m, bounds) {
  const rawWidth = max(m.a.x, m.b.x, m.c.x) - min(m.a.x, m.b.x, m.c.x);
  const rawHeight = max(m.a.y, m.b.y, m.c.y) - min(m.a.y, m.b.y, m.c.y);

  const { w, h, pad } = bounds;
  const wScale = (w - (2 * pad)) / rawWidth;
  const hScale = (h - (2 * pad)) / rawHeight;

  return ({
    a: { x: (m.a.x * wScale) + pad, y: -((m.a.y * wScale) + pad) },
    b: { x: (m.b.x * wScale) + pad, y: -((m.b.y * hScale) + pad) },
    c: { x: (m.c.x * wScale) + pad, y: -((m.c.y * hScale) + pad) },
  });
}
