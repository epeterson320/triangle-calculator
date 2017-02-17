import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TriangleEasel.css';

const TriangleEasel = ({
  a, b, c, labels, onClickTriangle, onClickBackground, selected,
}) => (
  <div className={styles.container}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.viewport}
      onClick={onClickBackground}
    >
      <PointLabel {...labels.a} />
      <PointLabel {...labels.b} />
      <PointLabel {...labels.c} />
      <SideLabel {...labels.ab} />
      <SideLabel {...labels.ac} />
      <SideLabel {...labels.bc} />
      <path
        className={classnames({
          [styles.triangle]: true,
          [styles.selected]: selected,
        })}
        onClick={(e) => { e.stopPropagation(); onClickTriangle(); }}
        d={`M ${a.x},${a.y} L ${b.x},${b.y} L ${c.x},${c.y} Z`}
      />
    </svg>
  </div>
);

export default TriangleEasel;

TriangleEasel.defaultProps = {
  onClickTriangle: () => {},
  onClickBackground: () => {},
  selected: false,
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
  selected: PropTypes.bool,
  onClickTriangle: PropTypes.func,
  onClickBackground: PropTypes.func,
};

/*
TODO: Turn <PointLabel> into an "EditPoint" or "EditSide" view when clicked:

+----------------+
| Point  _A_     |
| Angle [60.5] X |
|            OK  |
+----------------+
*/

export const PointLabel = ({ x, y, text }) =>
  <text className={styles.pointLabel} x={x} y={y}>{text}</text>;

PointLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export const SideLabel = ({ x, y, text }) =>
  <text className={styles.sideLabel} x={x} y={y}>{text}</text>;

SideLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};