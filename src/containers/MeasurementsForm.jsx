import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideInput from '../components/SideInput';
import PointInput from '../components/PointInput';
import RadioList from '../components/RadioList';
import * as action from '../modules/input';
import * as labelAction from '../modules/labels';
import solveTriangle from '../selectors/solveTriangle';
import { DEG, RAD, Side, Point } from '../constants';

const { PI } = Math;

const radioOpts = [
  { label: 'Degrees', value: DEG, default: true },
  { label: 'Radians', value: RAD },
];

export class MeasurementsForm extends Component {
  render() {
    const { a, b, c, A, B, C, dispatch } = this.props;
    const { setAngleUnit, setAngle, setSide } = bindActionCreators(
      action,
      dispatch,
    );
    const { renamePoint } = bindActionCreators(labelAction, dispatch);

    return (
      <form className="MeasurementsForm__container">
        <h3 className="MeasurementsForm__header">Angle Unit</h3>
        <RadioList opts={radioOpts} onChange={setAngleUnit} />
        <h3 className="MeasurementsForm__header">Point names & Angles</h3>
        <PointInput {...A} onChange={setAngle} onChangeLabel={renamePoint} />
        <PointInput {...B} onChange={setAngle} onChangeLabel={renamePoint} />
        <PointInput {...C} onChange={setAngle} onChangeLabel={renamePoint} />
        <h3 className="MeasurementsForm__header">Side Lengths</h3>
        <SideInput {...c} onChange={setSide} />
        <SideInput {...b} onChange={setSide} />
        <SideInput {...a} onChange={setSide} />
      </form>
    );
  }
}

const sides = Object.keys(Side);
const points = Object.keys(Point);
const inputs = sides.concat(points);

const mapStateToProps = ({ input, labels }) => {
  const { errors, computed } = solveTriangle(input);
  const hasErrors = Object.keys(errors).length > 0;
  const props = {
    A: { id: 'A', text: input.A, error: errors.A, label: labels.A },
    B: { id: 'B', text: input.B, error: errors.B, label: labels.B },
    C: { id: 'C', text: input.C, error: errors.C, label: labels.C },
    c: { id: 'c', text: input.c, error: errors.c, label: labels.A + labels.B },
    b: { id: 'b', text: input.b, error: errors.b, label: labels.A + labels.C },
    a: { id: 'a', text: input.a, error: errors.a, label: labels.B + labels.C },
  };

  inputs.forEach(field => {
    const isComputed = !!computed[field] && !input[field];
    if (isComputed) {
      props[field].text = computed[field];
      props[field].computed = computed[field];
    }
    if (hasErrors && !errors[field]) props[field].disabled = true;
  });

  const computedPoints = points.filter(p => props[p].computed);
  const computedSides = sides.filter(s => props[s].computed);

  if (input.unit === DEG) {
    computedPoints.forEach(point => {
      props[point].text = ((computed[point] * 180) / PI).toFixed(2);
    });
  } else {
    computedPoints.forEach(point => {
      props[point].text = computed[point].toFixed(4);
    });
  }

  computedSides.forEach(side => {
    if (computed[side] >= 100) {
      props[side].text = computed[side].toFixed(1);
    } else {
      props[side].text = computed[side].toPrecision(4);
    }
  });

  return props;
};

export default connect(mapStateToProps)(MeasurementsForm);
