import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Point, Side, setAngle, setSide, unsetAngle, unsetSide } from '../modules/measurements';

function EditForm({ show, label, name, metric, onOK, onClear }) {
  if (!show) return null;

  return (<form>
    <label htmlFor="pt">{label}</label>
    <input id="pt" defaultValue={name} />
    <label htmlFor="met">{metric}</label>
    <input id="met" defaultValue="60.5" />
    <button onClick={(e) => { e.preventDefault(); onClear(); }}>Clear</button>
    <button onClick={(e) => { e.preventDefault(); onOK(e.target.form.querySelector('#met').value); }}>OK</button>
  </form>);
}

EditForm.defaultProps = {
  label: '',
  name: '',
  metric: '',
  onOK: () => {},
  onClear: () => {},
};

EditForm.propTypes = {
  show: PropTypes.bool.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  metric: PropTypes.string,
  onOK: PropTypes.func,
  onClear: PropTypes.func,
};

function mapStateToProps({ uiState }) {
  const { selected } = uiState;
  const { A, B, C } = Point;
  const { AB, AC, BC } = Side;

  if (selected === A || selected === B || selected === C) {
    return { show: true,
      label: 'Point',
      name: selected,
      metric: 'Angle',
    };
  } else if (selected === AB || selected === AC || selected === BC) {
    return {
      show: true,
      label: 'Side',
      name: selected,
      metric: 'Length',
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
