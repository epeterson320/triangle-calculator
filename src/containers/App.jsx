import React from 'react'
import styles from './App.scss'
import MeasurementsForm from './MeasurementsForm'
import TriangleDrawing from './TriangleDrawing'

const App = (props) => {
  return (
    <div className={styles.app}>
      <TriangleDrawing />
      <MeasurementsForm />
    </div>
  )
}

export default App
