import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TriangleEasel.css';
import EditForm from '../containers/EditForm';
import { Point, Side } from '../modules/app';

const TriangleEasel = ({
  a, b, c, labels, onClickTriangle, onClickBackground, onClickPoint, onClickSide, selected,
}) => (
  <div className={styles.container}>
    <EditForm />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.viewport}
      onClick={onClickBackground}
    >
      <PointLabel {...labels.a} onClick={() => { onClickPoint(Point.A); }} />
      <PointLabel {...labels.b} onClick={() => { onClickPoint(Point.B); }} />
      <PointLabel {...labels.c} onClick={() => { onClickPoint(Point.C); }} />
      <SideLabel {...labels.ab} onClick={() => { onClickSide(Side.AB); }} />
      <SideLabel {...labels.ac} onClick={() => { onClickSide(Side.AC); }} />
      <SideLabel {...labels.bc} onClick={() => { onClickSide(Side.BC); }} />
      <path
        className={classnames({
          [styles.triangle]: true,
          [styles.selected]: selected === 'triangle',
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
  onClickPoint: () => {},
  onClickSide: () => {},
  selected: '',
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
  selected: PropTypes.string,
  onClickTriangle: PropTypes.func,
  onClickBackground: PropTypes.func,
  onClickPoint: PropTypes.func,
  onClickSide: PropTypes.func,
};

export const PointLabel = ({ x, y, text, onClick }) =>
  <text
    className={styles.pointLabel}
    x={x}
    y={y}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
  >
    {text}
  </text>;

export const SideLabel = ({ x, y, text, onClick }) =>
  <text
    className={styles.sideLabel}
    x={x}
    y={y}
    onClick={(e) => { e.stopPropagation(); onClick(); }}
  >{text}</text>;

const labelDefaultProps = {
  onClick: () => {},
};

PointLabel.defaultProps = labelDefaultProps;
SideLabel.defaultProps = labelDefaultProps;

const labelPropTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

PointLabel.propTypes = labelPropTypes;
SideLabel.propTypes = labelPropTypes;
