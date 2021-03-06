import React, { Component } from 'react';
import styles from './Checkbox.module.css';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if ('onChange' in this.props) {
      this.props.onChange(e.target.checked);
    }
  }

  render() {
    return (
      <label className={styles.container}>
        <input
          type="checkbox"
          className={styles.input}
          onChange={this.onChange}
        />
        <span className={styles.label}>{this.props.label}</span>
      </label>
    );
  }
}
