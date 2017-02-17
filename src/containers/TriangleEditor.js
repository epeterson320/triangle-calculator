import { connect } from 'react-redux';
import TriangleEasel from '../components/TriangleEasel';
import { selectTriangle, unselectTriangle } from '../modules/uiState';

const EQ_ANGLE = Math.PI / 3;

/**
 * Takes a set of measurements (3 sides, 3 angles) and adds assumptions so that
 * enough are defined to make an unambiguous triangle.
 */
function assumeMeasurements(m) {
  const nAnglesDef = !!m.a + !!m.b + !!m.c;
  const nSidesDef = !!m.ab + !!m.ac + !!m.bc;
  if (nAnglesDef === 0 && nSidesDef === 0) {
    return { a: EQ_ANGLE, ab: 60, ac: 60 };
  }
}

function computeMeasurements(m0) {
  const m1 = assumeMeasurements(m0);
  if (!!m1.a && !!m1.ab && !!m1.ac) return m1;
  /*
  Law of sines:
  a ∕ (sin A) = b ∕ (sin B) = c ∕ (sin C)

  Law of cosines:
  c² = a² + b² - 2ab cos(c)

  Heron's formula
  A = √[s(s-a)(s-b)(s-c)]
  where s = (a + b + c) / 2
   */
}

function measurementsToCoords(measurements) {
  const { a, ab, ac } = computeMeasurements(measurements);
  const cx = Math.cos(a) * ac;
  const cy = Math.sin(a) * ac;

  const w = Math.min(0, cx);
  const h = cy;
  const scale = 80 / Math.max(w, h);

  const dx = Math.min(0, cx) + 20;

  return ({
    a: { x: dx, y: 100 },
    b: { x: (scale * ab) + dx, y: 100 },
    c: { x: (scale * cx) + dx, y: 100 - (scale * cy) },
  });
}

export const mapStateToProps = state => ({
  ...measurementsToCoords(state.measurements),
  labels: {
    a: { x: 10, y: 108 },
    b: { x: 102, y: 108 },
    c: { x: 54, y: 26 },
    ab: { x: 54, y: 116 },
    ac: { x: 16, y: 68 },
    bc: { x: 84, y: 68 },
  },
  selected: state.uiState.selected,
});

export const mapDispatchToProps = dispatch => ({
  onClickTriangle: () => dispatch(selectTriangle()),
  onClickBackground: () => dispatch(unselectTriangle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriangleEasel);
