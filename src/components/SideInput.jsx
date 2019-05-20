import React, { PureComponent } from 'react';
import DebouncedTextInput from './DebouncedTextInput';

export default class SideInput extends PureComponent {
  render() {
    return (
      <div className="SideInput__container">
        <span className="SideInput__label">Side</span>
        <span className="SideInput__side">{this.props.label}</span>
        <DebouncedTextInput {...this.props} label="Length" />
      </div>
    );
  }
}
