import React from 'react'
import styles from './App.scss'
import MeasurementsForm from './MeasurementsForm'
import TriangleDrawing from './TriangleDrawing'
import DisplayPrefsForm from './DisplayPrefsForm'

const App = (props) => {
  return (
    <div className={styles.app}>
      <TriangleDrawing />
      <MeasurementsForm />
      <DisplayPrefsForm />
    </div>
  )
}

export default App
