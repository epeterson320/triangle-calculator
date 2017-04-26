/**
 * This is the root reducer for the application. Files in this folder
 * conform to the redux "ducks" convention.
 *
 * https://github.com/erikras/ducks-modular-redux
 */

// Enums
export const Side = { a: 'a', b: 'b', c: 'c' };
export const Point = { A: 'A', B: 'B', C: 'C' };

// Actions & Action Creators
export const SET_SIDE = 'SET_SIDE';
export const setSide = (side, length) => ({ type: SET_SIDE, side, length });

export const SET_ANGLE = 'SET_ANGLE';
export const setAngle = (point, angle) => ({ type: SET_ANGLE, point, angle });

export const UNSET_SIDE = 'UNSET_SIDE';
export const unsetSide = side => ({ type: UNSET_SIDE, side });

export const UNSET_ANGLE = 'UNSET_ANGLE';
export const unsetAngle = point => ({ type: UNSET_ANGLE, point });


// No set measurements initially
// Up to 3 sides, 2 sides + 1 angle, or 1 side + 2 angles
// Lengths can be any positive number, but the sum of the two smaller lengths
//   must be greater than the larger length.
// Angles can be between 0 and PI non-inclusive
const init = { a: 0, b: 0, c: 0, C: 0, B: 0, A: 0 };

export default function app(state = init, action = {}) {
  switch (action.type) {
    case SET_ANGLE: {
      const { point, angle } = action;
      if (typeof angle !== 'number') return state;
      if (isNaN(angle)) return state;
      if (angle === Infinity || angle === -Infinity) return state;

      // Update measurement
      const newState = Object.assign({}, state, { [point]: angle });
      // Make sure it's possible. If not, return unchanged.
      const numSidesSet = (!!newState.a) + (!!newState.b) + (!!newState.c);
      const numAnglesSet = (!!newState.A) + (!!newState.B) + (!!newState.C);
      if (numSidesSet === 3) return state;
      if (numSidesSet === 2 && numAnglesSet === 2) return state;
      if (numAnglesSet === 3) return state;
      if (newState.A + newState.B + newState.C >= Math.PI) return state;
      // It is possible, return the new state
      return newState;
    }
    case SET_SIDE: {
      const { side, length } = action;
      if (typeof length !== 'number') return state;
      if (isNaN(length)) return state;
      if (length === Infinity || length === -Infinity) return state;

      // Update measurement
      const newState = Object.assign({}, state, { [side]: length });
      // Make sure it's possible. If not, return unchanged.
      const numSidesSet = (!!newState.a) + (!!newState.b) + (!!newState.c);
      const numAnglesSet = (!!state.A) + (!!state.B) + (!!state.C);
      if (numSidesSet + numAnglesSet > 3) return state;
      if (numSidesSet === 3) {
        if (newState.a + newState.b <= newState.c) return state;
        if (newState.a + newState.c <= newState.b) return state;
        if (newState.b + newState.c <= newState.a) return state;
      }
      // It is possible, return the new state
      return newState;
    }
    case UNSET_SIDE: {
      return Object.assign({}, state, { [action.side]: 0 });
    }
    case UNSET_ANGLE: {
      return Object.assign({}, state, { [action.point]: 0 });
    }
    default:
      return state;
  }
}
