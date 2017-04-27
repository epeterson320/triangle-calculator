import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './MeasurementInput.scss';

const { PI } = Math;
const DELAY = 300; // ms
export const METRIC = { LENGTH: 0, DEG: 1, RAD: 2 };

class MeasurementInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.computedVal || '' };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.computedVal) {
      this.setState({ text: nextProps.computedVal.toFixed(3) });
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
    this.props.onClear();
  }

  notify() {
    const text = this.state.text;
    if (text) {
      const num = parseFloat(text);
      if (num) {
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
  metric: METRIC.LENGTH,
};

export default MeasurementInput;
