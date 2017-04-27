import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MeasurementInput from '../components/MeasurementInput';
import RadioList from '../components/RadioList';
import {
  setSide, setAngle, unsetSide, unsetAngle, Side, Point,
} from '../modules/measurements';
import { setAngleUnit } from '../modules/display';
import { inferMeasurements } from '../geometry/triangleInfo';
import { DEG, RAD } from '../geometry/Metric';

const MeasurementsForm = ({ computed, set, unset, setUnit, metric }) => (
  <form>
    <RadioList
      opts={[
        { label: 'Degrees', value: DEG, default: true },
        { label: 'Radians', value: RAD },
      ]}
      onChange={setUnit}
    />
    <MeasurementInput
      label="A" onChange={set.A} onClear={unset.A} computedVal={computed.A} metric={metric}
    />
    <MeasurementInput
      label="B" onChange={set.B} onClear={unset.B} computedVal={computed.B} metric={metric}
    />
    <MeasurementInput
      label="C" onChange={set.C} onClear={unset.C} computedVal={computed.C} metric={metric}
    />
    <MeasurementInput label="a" onChange={set.a} onClear={unset.a} computedVal={computed.a} />
    <MeasurementInput label="b" onChange={set.b} onClear={unset.b} computedVal={computed.b} />
    <MeasurementInput label="c" onChange={set.c} onClear={unset.c} computedVal={computed.c} />
  </form>
);

MeasurementsForm.propTypes = {
  set: PropTypes.shape({
    A: PropTypes.func.isRequired,
    B: PropTypes.func.isRequired,
    C: PropTypes.func.isRequired,
    a: PropTypes.func.isRequired,
    b: PropTypes.func.isRequired,
    c: PropTypes.func.isRequired,
  }).isRequired,
  unset: PropTypes.shape({
    A: PropTypes.func.isRequired,
    B: PropTypes.func.isRequired,
    C: PropTypes.func.isRequired,
    a: PropTypes.func.isRequired,
    b: PropTypes.func.isRequired,
    c: PropTypes.func.isRequired,
  }).isRequired,
  computed: PropTypes.shape({
    A: PropTypes.number,
    B: PropTypes.number,
    C: PropTypes.number,
    a: PropTypes.number,
    b: PropTypes.number,
    c: PropTypes.number,
  }),
  metric: PropTypes.string.isRequired,
  setUnit: PropTypes.func.isRequired,
};

MeasurementsForm.defaultProps = {
  computed: {},
};

const mapStateToProps = (state) => {
  const inferred = inferMeasurements(state.measurements);
  const computed = {};
  Object.keys(inferred).forEach((key) => {
    if (!state.measurements[key]) computed[key] = inferred[key];
  });
  return { computed, metric: state.display.angleUnit };
};

const mapDispatchToProps = (dispatch) => {
  const action = (creator, element) => text =>
    dispatch(creator(element, text));

  return {
    set: {
      A: action(setAngle, Point.A),
      B: action(setAngle, Point.B),
      C: action(setAngle, Point.C),
      a: action(setSide, Side.a),
      b: action(setSide, Side.b),
      c: action(setSide, Side.c),
    },
    unset: {
      A: action(unsetAngle, Point.A),
      B: action(unsetAngle, Point.B),
      C: action(unsetAngle, Point.C),
      a: action(unsetSide, Side.a),
      b: action(unsetSide, Side.b),
      c: action(unsetSide, Side.c),
    },
    setUnit: (unit) => { dispatch(setAngleUnit(unit)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeasurementsForm);
