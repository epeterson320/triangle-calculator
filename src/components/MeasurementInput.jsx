import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './MeasurementInput.css';

const DELAY = 300; // ms

class MeasurementInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    window.clearTimeout(this.timeoutID);
    const text = e.target.value;
    const num = parseFloat(text);
    if (text && isNaN(num)) return; // Ignore invalid input

    this.timeoutID = window.setTimeout(() => {
      if (this.input.value) {
        this.props.onChange(num);
      } else {
        this.props.onClear();
      }
      this.forceUpdate();
    }, DELAY);
  }

  handleClear() {
    this.input.value = '';
    this.forceUpdate();
    this.props.onClear();
  }

  render() {
    const { label } = this.props;
    const isEmpty = !(this.input && this.input.value);
    return (
      <fieldset>
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          className={styles.input}
          ref={(input) => { this.input = input; }}
          onChange={this.handleChange}
        />
        <button
          className={classNames(styles.button, { [styles.hidden]: isEmpty })}
          onClick={this.handleClear}
          type="button"
          tabIndex={-1}
        >
          Clear
        </button>
      </fieldset>
    );
  }
}

MeasurementInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
};

MeasurementInput.defaultProps = {
  onChange: () => {},
  onClear: () => {},
};

export default MeasurementInput;
