import React from 'react';
import PropTypes from 'prop-types';
import styles from './MeasurementInput.css';

const MeasurementInput = ({ label }) => (
  <fieldset>
    <label htmlFor={label}>{label}</label>
    <input id={label} className={styles.input} />
    <button>Clear</button>
  </fieldset>
);

MeasurementInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default MeasurementInput;
