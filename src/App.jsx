import React, { Component } from 'react';
import MeasurementsForm from './containers/MeasurementsForm';
import TriangleDrawing from './containers/TriangleDrawing';
import DisplayPrefsForm from './containers/DisplayPrefsForm';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MeasurementsForm />
        <TriangleDrawing />
        <DisplayPrefsForm />
      </div>
    );
  }
}
