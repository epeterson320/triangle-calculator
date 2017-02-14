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
Views (2 screens on mobile, 1 screen on tablet).
Edit (Drag point, input boxes for measurements)
Results (Scrolling text view showing work)
*/
export default App;
