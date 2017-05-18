import React, { Component } from 'react'
import MeasurementsForm from './MeasurementsForm'
import TriangleDrawing from './TriangleDrawing'
import DisplayPrefsForm from './DisplayPrefsForm'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <TriangleDrawing />
        <MeasurementsForm />
        <DisplayPrefsForm />
      </div>
    )
  }
}
