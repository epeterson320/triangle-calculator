import { DEG, RAD } from '../constants'

export const SET_SIDE = 'input/SET_SIDE'
export const setSide = (side, length) => ({ type: SET_SIDE, side, length })

export const SET_ANGLE = 'input/SET_ANGLE'
export const setAngle = (point, angle) => ({ type: SET_ANGLE, point, angle })

export const SET_ANGLE_UNIT = 'input/SET_ANGLE_UNIT'
export const setAngleUnit = (unit) => ({ type: SET_ANGLE_UNIT, unit })

const { PI } = Math

const init = {
  a: '',
  b: '',
  c: '',
  A: '',
  B: '',
  C: '',
  unit: DEG
}

export default function reduce (state = init, action = {}) {
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
      if (action.unit === state.unit) return state
      if (state.unit === DEG && action.unit === RAD) {
        return Object.assign({}, state, {
          unit: RAD,
          A: state.A ? (parseFloat(state.A) * PI / 180).toFixed(5) : state.A,
          B: state.B ? (parseFloat(state.B) * PI / 180).toFixed(5) : state.B,
          C: state.C ? (parseFloat(state.C) * PI / 180).toFixed(5) : state.C
        })
      } else if (state.unit === RAD && action.unit === DEG) {
        return Object.assign({}, state, {
          unit: DEG,
          A: state.A ? (parseFloat(state.A) * 180 / PI).toFixed(3) : state.A,
          B: state.B ? (parseFloat(state.B) * 180 / PI).toFixed(3) : state.B,
          C: state.C ? (parseFloat(state.C) * 180 / PI).toFixed(3) : state.C
        })
      }
      return state // invalid input
    }
    case 'init/INIT': {
      return Object.assign({}, state, action.payload.input)
    }
    default: {
      return state
    }
  }
}
