import { connect } from 'react-redux';
import TriangleEasel from '../components/TriangleEasel';
import { selectTriangle, unselectTriangle } from '../modules/uiState';

const { sin, cos, asin, acos, min, max, PI } = Math;
const EQ_ANGLE = PI / 3;

function assumeSide(m) {
  if (!m.ab) return Object.assign({}, m, { ab: 80 });
  if (!m.ac) return Object.assign({}, m, { ac: 80 });
  if (!m.bc) return Object.assign({}, m, { bc: 80 });
  return m;
}

function assumeAngle(m) {
  if (!m.a) return Object.assign({}, m, { a: EQ_ANGLE });
  if (!m.b) return Object.assign({}, m, { b: EQ_ANGLE });
  if (!m.c) return Object.assign({}, m, { c: EQ_ANGLE });
  return m;
}

/**
 * Takes a set of measurements (3 sides, 3 angles) and adds assumptions so that
 * enough are defined to make an unambiguous triangle.
 */
function assumeMeasurements(m) {
  const nAnglesDef = !!m.a + !!m.b + !!m.c;
  const nSidesDef = !!m.ab + !!m.ac + !!m.bc;
  if (nSidesDef + nAnglesDef === 3 && nSidesDef > 1) return m;
  if (nSidesDef === 0 && nAnglesDef === 2) return assumeSide(m);
  return assumeMeasurements(assumeAngle(m));
}

function mFrom3Sides({ ab, ac, bc }) {
  // Law of cosines (textbook): c² = a² + b² - 2ab cos(C)
  // In our terminology: a = cos⁻¹((ab² + ac² - bc²) / (2 * ab * ac))
  const numr = (ab * ab) + (ac * ac) - (bc * bc);
  const denom = 2 * ab * ac;
  const a = acos(numr / denom);
  return { a, ab, ac };
}

/** Get third side from 2 sides with a common angle (law of cosines) */
const getThirdSide = (a, b, C) =>
  Math.sqrt((a * a) + (b * b) - (2 * a * b * Math.cos(C)));

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

function mFrom2Angles(m) {
  const a = m.a || (PI - m.b - m.c);
  const b = m.b || (PI - m.a - m.c);
  const c = m.c || (PI - m.a - m.b);

  // law of sines ratio
  const ratio = (m.ab && (sin(m.c) / m.ab))
    || (m.ac && (sin(m.b) / m.ac))
    || (m.bc && (sin(m.a) / m.bc));

  const ab = sin(c) / ratio;
  const ac = sin(b) / ratio;
  const bc = sin(a) / ratio;
  return { a, b, c, ab, ac, bc };
}

function mFrom2Sides1Ang(m) {
  if (!!m.a && !!m.ab && !!m.ac) {
    return m;
  } else if (!!m.c && !!m.ac && !!m.bc) {
    const ab = getThirdSide(m.ac, m.bc, m.c);
    return mFrom3Sides(Object.assign({}, m, { ab }));
  } else if (!!m.b && !!m.ab && !!m.bc) {
    const ac = getThirdSide(m.ab, m.bc, m.b);
    return mFrom3Sides(Object.assign({}, m, { ac }));
  }
  const m1 = getSecondAngle(m);
  return mFrom2Angles(m1);
}

function computeMeasurements(m0) {
  const m = assumeMeasurements(m0);
  const nSidesDef = !!m.ab + !!m.ac + !!m.bc;
  const nAnglesDef = !!m.a + !!m.b + !!m.c;
  if (nSidesDef === 3) return mFrom3Sides(m);
  if (nSidesDef === 2 && nAnglesDef === 1) return mFrom2Sides1Ang(m);
  if (nSidesDef === 1 && nAnglesDef === 2) return mFrom2Angles(m);
  throw new Error('Define 3 sides, 2 sides + 1 angle, or 1 side + 2 angles');
}

function measurementsToCoords(measurements) {
  const { a, ab, ac } = computeMeasurements(measurements);
  const cx = cos(a) * ac;
  const cy = sin(a) * ac;

  const w = min(0, cx);
  const h = cy;
  const scale = 80 / max(w, h);

  const dx = min(0, cx) + 20;

  return ({
    a: { x: dx, y: 100 },
    b: { x: (scale * ab) + dx, y: 100 },
    c: { x: (scale * cx) + dx, y: 100 - (scale * cy) },
  });
}

export const mapStateToProps = state => ({
  ...measurementsToCoords(state.measurements),
  labels: {
    a: { text: 'A', x: 10, y: 108 },
    b: { text: 'B', x: 102, y: 108 },
    c: { text: 'C', x: 54, y: 26 },
    ab: { text: 'AB', x: 54, y: 116 },
    ac: { text: 'AC', x: 16, y: 68 },
    bc: { text: 'BC', x: 84, y: 68 },
  },
  selected: state.uiState.selected,
});

export const mapDispatchToProps = dispatch => ({
  onClickTriangle: () => dispatch(selectTriangle()),
  onClickBackground: () => dispatch(unselectTriangle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriangleEasel);
