import { connect } from 'react-redux';
import TriangleEasel from '../components/TriangleEasel';
import { selectTriangle, unselectTriangle } from '../modules/uiState';
import getCoords from './trigSelector';

export const mapStateToProps = state => ({
  ...getCoords(state.measurements),
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
