import reduce, { setAngleUnit, SET_ANGLE_UNIT } from './display';
import { DEG, RAD, NONE } from '../geometry/Metric';

describe('Reducer', () => {
  it('has an initial state', () => {
    expect(reduce()).toBeDefined();
  });

  it('sets the angle unit', () => {
    const state0 = reduce();
    const state1 = reduce(state0, setAngleUnit(DEG));
    expect(state1.angleUnit).toBe(DEG);
    const state2 = reduce(state1, setAngleUnit(RAD));
    expect(state2.angleUnit).toBe(RAD);
  });

  it('throws away non-angle units', () => {
    const state0 = reduce();
    const state1 = reduce(state0, setAngleUnit(NONE));
    expect(state0.angleUnit).toBe(state1.angleUnit);
  });
});

describe('Action Creators', () => {
  it('creates an action to set the metric', () => {
    expect(setAngleUnit(DEG)).toEqual({ type: SET_ANGLE_UNIT, unit: DEG });
    expect(setAngleUnit(RAD)).toEqual({ type: SET_ANGLE_UNIT, unit: RAD });
  });
});
