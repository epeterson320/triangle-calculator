import React from 'react';
import styles from './App.css';
import TriangleViewport from './TriangleViewport';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, this is a trigonometry calculator.</h2>
    <TriangleViewport />
  </div>
);

export default App;
