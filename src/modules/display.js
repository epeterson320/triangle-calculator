/**
 * Reducer for UI preferences & state.
 */
import { DEG, RAD } from '../geometry/Metric'

// Actions & Action Creators
export const SET_ANGLE_UNIT = 'SET_ANGLE_UNIT'
export const setAngleUnit = unit => ({ type: SET_ANGLE_UNIT, unit })

// Reducer
const init = { angleUnit: DEG }

export default function display (state = init, action = {}) {
  switch (action.type) {
    case SET_ANGLE_UNIT:
      return (action.unit === DEG || action.unit === RAD)
        ? Object.assign({}, state, { angleUnit: action.unit })
        : state
    default:
      return state
  }
}
