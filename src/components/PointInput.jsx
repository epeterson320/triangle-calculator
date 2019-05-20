import React, { Component } from 'react';
import DebouncedTextInput from './DebouncedTextInput';
import CharInput from './CharInput';

export default class PointInput extends Component {
  render() {
    return (
      <div className="PointInput__container">
        <CharInput
          id={this.props.id}
          char={this.props.label}
          onChange={this.props.onChangeLabel}
        />
        <DebouncedTextInput {...this.props} label="Angle" />
      </div>
    );
  }
}
