import React from 'react';
import styles from './App.css';
import MeasurementsForm from './MeasurementsForm';

const App = () => (
  <div className={styles.app}>
    <MeasurementsForm />
  </div>
);

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

export default App;
