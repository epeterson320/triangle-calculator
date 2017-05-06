import { DEG, RAD } from '../geometry/Metric'

const PI = Math.PI

// Enums
export const Side = { a: 'a', b: 'b', c: 'c' }
export const Point = { A: 'A', B: 'B', C: 'C' }

// Actions & Action Creators
export const SET_SIDE = 'SET_SIDE'
export const setSide = (side, length) => ({ type: SET_SIDE, side, length })

export const SET_ANGLE = 'SET_ANGLE'
export const setAngle = (point, angle) => ({ type: SET_ANGLE, point, angle })

export const SET_ANGLE_UNIT = 'SET_ANGLE_UNIT'
export const setAngleUnit = unit => ({ type: SET_ANGLE_UNIT, unit })

export const RENAME_POINT = 'RENAME_POINT'
export const renamePoint = (point, name) => ({ type: RENAME_POINT, point, name })

export const TOGGLE_SHOW_CCENTER = 'TOGGLE_SHOW_CCENTER'
export const toggleShowCCenter = () => ({ type: TOGGLE_SHOW_CCENTER })

// No set measurements initially
// Up to 3 sides, 2 sides + 1 angle, or 1 side + 2 angles
// Lengths can be any positive number, but the sum of the two smaller lengths
//   must be greater than the larger length.
// Angles can be between 0 and PI non-inclusive
const init = {
  a: '',
  b: '',
  c: '',
  C: '',
  B: '',
  A: '',
  angleUnit: DEG,
  labels: {
    A: 'A',
    B: 'B',
    C: 'C'
  },
  showCCenter: false
}

export default function app (state = init, action = {}) {
  switch (action.type) {
    case SET_ANGLE: {
      // Update measurement
      const { point, angle } = action
      const newState = Object.assign({}, state, { [point]: angle })

      // Make sure it's possible. If not, return unchanged.
      const numSidesSet = (!!newState.a) + (!!newState.b) + (!!newState.c)
      const numAnglesSet = (!!newState.A) + (!!newState.B) + (!!newState.C)
      if (numSidesSet + numAnglesSet > 3) return state
      if (numAnglesSet === 3) return state

      // It is possible, return the new state
      return newState
    }
    case SET_SIDE: {
      // Update measurement
      const { side, length } = action
      const newState = Object.assign({}, state, { [side]: length })

      // Make sure it's possible. If not, return unchanged.
      const numSidesSet = (!!newState.a) + (!!newState.b) + (!!newState.c)
      const numAnglesSet = (!!state.A) + (!!state.B) + (!!state.C)
      if (numSidesSet + numAnglesSet > 3) return state

      // It is possible, return the new state
      return newState
    }
    case SET_ANGLE_UNIT: {
      if (action.unit === state.angleUnit) return state
      if (state.angleUnit === DEG && action.unit === RAD) {
        return Object.assign({}, state, {
          angleUnit: RAD,
          A: (parseFloat(state.A) * PI / 180 || state.A).toString(),
          B: (parseFloat(state.B) * PI / 180 || state.B).toString(),
          C: (parseFloat(state.C) * PI / 180 || state.C).toString()
        })
      } else if (state.angleUnit === RAD && action.unit === DEG) {
        return Object.assign({}, state, {
          angleUnit: DEG,
          A: (parseFloat(state.A) * 180 / PI || state.A).toString(),
          B: (parseFloat(state.B) * 180 / PI || state.B).toString(),
          C: (parseFloat(state.C) * 180 / PI || state.C).toString()
        })
      }
      return state // invalid input
    }
    case RENAME_POINT: {
      const { point, name } = action
      const labels = Object.assign({}, state.labels, { [point]: name })
      return Object.assign({}, state, { labels })
    }
    case TOGGLE_SHOW_CCENTER:
      return Object.assign({}, state, { showCCenter: !state.showCCenter })

    default:
      return state
  }
}
