import { connect } from 'react-redux';
import TriangleEasel from '../components/TriangleEasel';
import { selectTriangle, unselectElement, selectPoint, selectSide } from '../modules/app';

export const mapStateToProps = state => ({
  a: { x: state.a.x, y: state.a.y },
  b: { x: state.b.x, y: state.b.y },
  c: { x: state.c.x, y: state.c.y },
  labels: {
    a: { text: 'A', x: 10, y: 108 },
    b: { text: 'B', x: 102, y: 108 },
    c: { text: 'C', x: 54, y: 26 },
    ab: { text: 'AB', x: 54, y: 116 },
    ac: { text: 'AC', x: 16, y: 68 },
    bc: { text: 'BC', x: 84, y: 68 },
  },
  selected: state.selected,
});

export const mapDispatchToProps = dispatch => ({
  onClickTriangle: () => dispatch(selectTriangle()),
  onClickBackground: () => dispatch(unselectElement()),
  onClickPoint: p => dispatch(selectPoint(p)),
  onClickSide: s => dispatch(selectSide(s)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriangleEasel);
