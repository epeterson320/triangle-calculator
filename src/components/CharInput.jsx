import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './CharInput.module.css';

const BLINK_RATE = 500; // ms

export default class CharInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      blinking: false,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleBlink = this.toggleBlink.bind(this);
  }

  onKeyDown(e) {
    const char = e.key || String.fromCharCode(e.keyCode);
    if (char && 'onChange' in this.props) {
      this.props.onChange(this.props.id, char.toUpperCase());
    }
  }

  onFocus() {
    this.setState({ focused: true, blinking: true });
    this.intervalID = setInterval(this.toggleBlink, BLINK_RATE);
  }

  onBlur() {
    clearInterval(this.intervalID);
    this.setState({ focused: false, blinking: false });
  }

  toggleBlink() {
    this.setState({ focused: true, blinking: !this.state.blinking });
  }

  render() {
    const { id, char } = this.props;
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={`c${id}`}>
          Point
        </label>
        <input
          id={`c${id}`}
          type="text"
          value={char}
          onKeyDown={this.onKeyDown}
          readOnly
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          maxLength={1}
          tabIndex={-1}
          className={classnames({
            [styles.input]: true,
            [styles.cursor]: this.state.blinking,
          })}
        />
      </div>
    );
  }
}
