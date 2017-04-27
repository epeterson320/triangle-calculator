import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './MeasurementInput.scss';
import { DEG, RAD, NONE } from '../geometry/Metric';

const { PI } = Math;
const DELAY = 300; // ms

class MeasurementInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.computedVal) {
      this.setState({ text: nextProps.computedVal.toString() });
    }
    if (this.props.computedVal && !nextProps.computedVal) {
      this.setState({ text: '' });
    }
    if (this.props.metric === RAD && nextProps.metric === DEG) {
      const val = parseFloat(this.state.text);
      if (val) {
        this.setState({ text: (val * 360 / (2 * PI)).toString() });
      }
    }
    if (this.props.metric === DEG && nextProps.metric === RAD) {
      const val = parseFloat(this.state.text);
      if (val) {
        this.setState({ text: (val * 2 * PI / 360).toString() });
      }
    }
  }

  onChange(e) {
    if (this.props.computedVal) return;
    this.setState({ text: e.target.value });
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(this.notify, DELAY);
  }

  onClear() {
    this.setState({ text: '' });
    this.notify();
  }

  notify() {
    const text = this.state.text;
    if (text) {
      const num = parseFloat(text);
      if (!num) return;

      if (this.props.metric === DEG) {
        this.props.onChange(num * 2 * PI / 360);
      } else {
        this.props.onChange(num);
      }
    } else {
      this.props.onClear();
    }
  }

  render() {
    const { label, computedVal } = this.props;
    const hideButton = computedVal || !this.state.text;

    const formattedValue = (computedVal)
      ? (computedVal.toString())
      : this.state.text;

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor={label}>{label}</label>
        <input
          id={label}
          className={classNames(
            styles.input,
            { [styles.computed]: !!computedVal },
          )}
          onChange={this.onChange}
          value={formattedValue}
          readOnly={this.props.computedVal}
        />
        <button
          className={classNames(
            styles.button,
            { [styles.hidden]: hideButton },
          )}
          onClick={this.onClear}
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
  computedVal: PropTypes.number,
  metric: PropTypes.number,
};

MeasurementInput.defaultProps = {
  onChange: () => {},
  onClear: () => {},
  computedVal: 0,
  metric: NONE,
};

export default MeasurementInput;
