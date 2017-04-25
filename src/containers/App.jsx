import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.scss';
import MeasurementsForm from './MeasurementsForm';
import TriangleDrawing from './TriangleDrawing';
import Triangle from '../geometry/Triangle';
import * as triangleInfo from '../geometry/triangleInfo';

export const App = (props /* , dispatch */) => {
  const metrics = {
    a: props.bc,
    b: props.ac,
    c: props.ab,
    A: props.a,
    B: props.b,
    C: props.c,
  };
  if (triangleInfo.canInferTriangle(metrics)) {
    const triangle = Triangle.FromMetrics(metrics);
    return (<div className={styles.app}>
      <MeasurementsForm />
      <TriangleDrawing triangle={triangle} />
    </div>);
  }
  return (<div className={styles.app}>
    <MeasurementsForm />
    <p>Not enough measurements to complete triangle.</p>
  </div>);
};

App.propTypes = {
  a: PropTypes.number,
  b: PropTypes.number,
  c: PropTypes.number,
  ab: PropTypes.number,
  ac: PropTypes.number,
  bc: PropTypes.number,
};

App.defaultProps = { a: 0, b: 0, c: 0, ab: 0, ac: 0, bc: 0 };

/*
On Mobile & portrait tablet
Bottom navigation w/ 2 options: Edit, Results

On landscape Tablet:
Edit view on left, results on right

On Web or widest screens:
Input form on left, edit view in middle, results on right

Views:
Edit (Drag point, input boxes for measurements)
Results (Scrolling text view showing work)

ROUTING
Paths:
  /         (edit point, also results for lg. devices)
  /results  (results view for small devices) <-- serve from here too! symlink?
Query Params:
  Param     Value          Default
  a, b, c   degrees        undefined
  A, B, C   pos. number    undefined
  &rotate   =2.2          // 0
  &pan      =30.1,20.2    // 0,0
  &showWork =false        // true

Note: Per RFC3986 it is ok to skip the slash after the host.
Therefore, trig.ericp.co?a=60&b=60&C=3.24 is a valid URL.
*/

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
