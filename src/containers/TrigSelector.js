/**
 * Returns coords for a triangle, (ax, ay, bx, by, cx, cy) given a set of
 * geometric info about the triangle's sides and angles.
 *
 * @param  {Object} measurements - sides and lengths. 0 means not defined
 * @return {Object}              x and y coords of points a, b, and c
 */
export default function getSVGCoordsFromMeasurements(measurements) {
  return {
    a: { x: 0, y: 0 },
    b: { x: 0, y: 0 },
    c: { x: 0, y: 0 },
  };
}
