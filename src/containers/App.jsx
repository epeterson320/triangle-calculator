import React, { Component } from 'react'
import styles from './App.scss'
import MeasurementsForm from './MeasurementsForm'
import TriangleDrawing from './TriangleDrawing'
import DisplayPrefsForm from './DisplayPrefsForm'

export default class App extends Component {
  render () {
    return (
      <div className={styles.app}>
        <TriangleDrawing />
        <MeasurementsForm />
        <DisplayPrefsForm />
      </div>
    )
  }
}
