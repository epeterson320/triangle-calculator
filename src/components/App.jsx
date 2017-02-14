import React from 'react';
import styles from './App.css';
import TriangleViewport from './TriangleViewport';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, this is a trigonometry calculator.</h2>
    <TriangleViewport />
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

Route:
ericp.co/trig
  Param     Value          Default
  ?view     =edit|results // edit
  &sides    =,60.5        // ,,
  &angles   =30.1,,45     // ,,
  &rotate   =2.2          // 0
  &pan      =30.1,20.2    // 0,0
  &showWork =false        // true
*/
export default App;
