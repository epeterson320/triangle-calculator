import React from 'react';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, triangle.</h2>
    <div className={styles.triangleViewport}>
      <svg
        width="120" height="120" viewPort="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="10" y="108">A</text>
        <text x="102" y="108">B</text>
        <text x="54" y="26">C</text>
        <text x="54" y="116" textDecoration="overline">AB</text>
        <text x="16" y="68" textDecoration="overline">AC</text>
        <text x="84" y="68" textDecoration="overline">BC</text>
        <polyline
          points="20,100 60,30 100,100 20,100"
          stroke="black"
          fill="#FFFF88"
        />
      </svg>
    </div>
  </div>
);

export default App;
