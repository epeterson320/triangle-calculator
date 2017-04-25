import React from 'react';
import PropTypes from 'prop-types';
import Triangle from '../geometry/Triangle';
import styles from './TriangleDrawing.scss';

const TriangleDrawing = ({ triangle }) => {
  const { a, b, c } = triangle;
  const { xl, xr, yt, yb } = triangle.viewbox;
  const svgViewbox = `0 0 ${xr - xl} ${yt - yb}`;
  const ax = a.x - xl;
  const ay = yt - a.y;
  const bx = b.x - xl;
  const by = yt - b.y;
  const cx = c.x - xl;
  const cy = yt - c.y;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={150} height={150} viewBox={svgViewbox}
      className={styles.svg}
    >
      <path
        d={`M ${ax},${ay} L ${bx},${by} L ${cx},${cy} Z`}
        className={styles.trianglePath}
      />
    </svg>
  );
};

TriangleDrawing.propTypes = {
  triangle: PropTypes.instanceOf(Triangle).isRequired,
};

export default TriangleDrawing;
