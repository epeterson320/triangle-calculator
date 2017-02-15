import React from 'react';
import styles from './TriangleViewport.css';

const TriangleViewport = () => (
  <div className={styles.viewport}>
    <svg
      width="120" height="120" viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text className={styles.pointLabel} x="10" y="108">a</text>
      <text className={styles.pointLabel} x="102" y="108">b</text>
      <text className={styles.pointLabel} x="54" y="26">c</text>
      <text className={styles.sideLabel} x="54" y="116">AB</text>
      <text className={styles.sideLabel} x="16" y="68">AC</text>
      <text className={styles.sideLabel} x="84" y="68">BC</text>
      <polyline
        className={styles.triangle}
        points="20,100 60,30 100,100 20,100"
      />
    </svg>
  </div>
);

export default TriangleViewport;
