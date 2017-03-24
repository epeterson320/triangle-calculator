import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Point, Side, setAngle, setSide, unsetAngle, unsetSide } from '../modules/app';
import styles from './EditForm.css';

function EditForm({ show, type, label, value, onOK, onClear }) {
  if (!show) return null;

  const nameLabel = (type === 'point') ? 'Point' : 'Side';
  const valLabel = (type === 'side') ? 'Angle' : 'Length';

  return (<form className={styles.editForm}>
    <label htmlFor="pt">{nameLabel}</label>
    <input id="pt" defaultValue={label} />
    <label htmlFor="met">{valLabel}</label>
    <input id="met" defaultValue="60.5" />
    <button onClick={(e) => { e.preventDefault(); onClear(); }}>Clear</button>
    <button onClick={(e) => { e.preventDefault(); onOK(e.target.form.querySelector('#met').value); }}>OK</button>
  </form>);
}

EditForm.defaultProps = {
  label: '',
  type: '',
  name: '',
  metric: '',
  value: 0,
  onOK: () => {},
  onClear: () => {},
};

EditForm.propTypes = {
  show: PropTypes.bool.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  onOK: PropTypes.func,
  onClear: PropTypes.func,
};

function mapStateToProps(state) {
  const selected = state.selectedElement;
  const { A, B, C } = Point;
  const { AB, AC, BC } = Side;

  if (selected === A || selected === B || selected === C) {
    return {
      show: true,
      type: 'point',
      label: state[selected].label,
      value: state[selected].angle,
    };
  } else if (selected === AB || selected === AC || selected === BC) {
    return {
      show: true,
      type: 'side',
      label: state[selected].label,
      value: state[selected].length,
    };
  }
  return { show: false };
}

function mergeProps(state, { dispatch }) {
  if (!state.show) return state;
  if (state.label === 'Point') {
    return Object.assign({}, state, {
      onOK: (metric) => { dispatch(setAngle(state.name, metric)); },
      onClear: () => { dispatch(unsetAngle(state.name)); },
    });
  }
  return Object.assign({}, state, {
    onOK: (metric) => { dispatch(setSide(state.name, metric)); },
    onClear: () => { dispatch(unsetSide(state.name)); },
  });
}

export default connect(mapStateToProps, undefined, mergeProps)(EditForm);
