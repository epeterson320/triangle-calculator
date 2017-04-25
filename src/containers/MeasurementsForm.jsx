import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MeasurementInput from '../components/MeasurementInput';
import {
  setSide, setAngle, unsetSide, unsetAngle, Side, Point,
} from '../modules/measurements';

const MeasurementsForm = ({ set, unset }) => (
  <form>
    <MeasurementInput label="A" onChange={set.a} onClear={unset.a} />
    <MeasurementInput label="B" onChange={set.b} onClear={unset.b} />
    <MeasurementInput label="C" onChange={set.c} onClear={unset.c} />
    <MeasurementInput label="AB" onChange={set.ab} onClear={unset.ab} />
    <MeasurementInput label="AC" onChange={set.ac} onClear={unset.ac} />
    <MeasurementInput label="BC" onChange={set.bc} onClear={unset.bc} />
  </form>
);

MeasurementsForm.propTypes = {
  set: PropTypes.shape({
    a: PropTypes.func.isRequired,
    b: PropTypes.func.isRequired,
    c: PropTypes.func.isRequired,
    ab: PropTypes.func.isRequired,
    ac: PropTypes.func.isRequired,
    bc: PropTypes.func.isRequired,
  }).isRequired,
  unset: PropTypes.shape({
    a: PropTypes.func.isRequired,
    b: PropTypes.func.isRequired,
    c: PropTypes.func.isRequired,
    ab: PropTypes.func.isRequired,
    ac: PropTypes.func.isRequired,
    bc: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const action = (creator, element) => text =>
    dispatch(creator(element, text));

  return {
    set: {
      a: action(setAngle, Point.A),
      b: action(setAngle, Point.B),
      c: action(setAngle, Point.C),
      ab: action(setSide, Side.AB),
      ac: action(setSide, Side.AC),
      bc: action(setSide, Side.BC),
    },
    unset: {
      a: action(unsetAngle, Point.A),
      b: action(unsetAngle, Point.B),
      c: action(unsetAngle, Point.C),
      ab: action(unsetSide, Side.AB),
      ac: action(unsetSide, Side.AC),
      bc: action(unsetSide, Side.BC),
    },
  };
};

export default connect(undefined, mapDispatchToProps)(MeasurementsForm);
