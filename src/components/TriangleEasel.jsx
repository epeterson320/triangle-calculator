import React, { PropTypes } from 'react';
import styles from './TriangleEasel.css';

const TriangleEasel = ({ a, b, c, labels, onClickTriangle }) => (
  <div className={styles.viewport}>
    <svg
      width="120" height="120" viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text className={styles.pointLabel} x={labels.a.x} y={labels.a.y}>A</text>
      <text className={styles.pointLabel} x={labels.b.x} y={labels.b.y}>B</text>
      <text className={styles.pointLabel} x={labels.c.x} y={labels.c.y}>C</text>
      <text className={styles.sideLabel} x={labels.ab.x} y={labels.ab.y}>AB</text>
      <text className={styles.sideLabel} x={labels.ac.x} y={labels.ac.y}>AC</text>
      <text className={styles.sideLabel} x={labels.bc.x} y={labels.bc.y}>BC</text>
      <path
        className={styles.triangle}
        onClick={onClickTriangle}
        d={`M ${a.x},${a.y} L ${b.x},${b.y} L ${c.x},${c.y} Z`}
      />
    </svg>
  </div>
);

/*
TODO

Turn <text> into an "EditPoint" or "EditSide" view when clicked:
+----------------+
| Point  _A_     |
| Angle [60.5] X |
|            OK  |
+----------------+
*/

TriangleEasel.defaultProps = {
  onClickTriangle: () => {},
};

const Coords = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

TriangleEasel.propTypes = {
  a: Coords.isRequired,
  b: Coords.isRequired,
  c: Coords.isRequired,
  labels: PropTypes.shape({
    a: Coords.isRequired,
    b: Coords.isRequired,
    c: Coords.isRequired,
    ab: Coords.isRequired,
    ac: Coords.isRequired,
    bc: Coords.isRequired,
  }).isRequired,
  onClickTriangle: PropTypes.func,
};

export default TriangleEasel;
