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
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillUpdate(nextProps) {
    const metric = this.props.metric;
    const nextMetric = nextProps.metric;
    if (metric === METRIC.DEG && nextMetric === METRIC.RAD) {
      const val = parseFloat(this.input.value);
      if (!val) return;
      this.input.value = (val * 2 * PI / 360).toFixed(3);
    } else if (metric === METRIC.RAD && metric === METRIC.DEG) {
      const val = parseFloat(this.input.value);
      if (!val) return;
      this.input.value = (val * 360 / (2 * PI)).toFixed(0);
    }
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
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor={label}>{label}</label>
        <input
          id={label}
          className={classNames(
            styles.input,
            { [styles.computed]: this.props.computed },
          )}
          ref={(input) => { this.input = input; }}
          onChange={this.handleChange}
        />
        <button
          className={classNames(
            styles.button,
            { [styles.hidden]: isEmpty },
          )}
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
  computed: PropTypes.bool,
  metric: PropTypes.number,
};

MeasurementInput.defaultProps = {
  onChange: () => {},
  onClear: () => {},
  computed: false,
  metric: METRIC.LENGTH,
};

export default MeasurementInput;
