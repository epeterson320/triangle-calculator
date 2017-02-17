import { connect } from 'react-redux';
import TriangleEasel from '../components/TriangleEasel';
import { selectTriangle, unselectTriangle } from '../modules/uiState';

export const mapStateToProps = state => ({
  a: { x: 20, y: 100 },
  b: { x: 60, y: 30 },
  c: { x: 100, y: 100 },
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

/*
Law of sines:
a ∕ (sin A) = b ∕ (sin B) = c ∕ (sin C)

Law of cosines:
c² = a² + b² - 2ab cos(c)

Heron's formula
A = √[s(s-a)(s-b)(s-c)]
where s = (a + b + c) / 2
 */
