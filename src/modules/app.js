/**
 * This is the root reducer for the application. Files in this folder
 * conform to the redux "ducks" convention.
 *
 * https://github.com/erikras/ducks-modular-redux
 */
const { PI } = Math;

// Enums
export const Side = { AB: 'ab', AC: 'ac', BC: 'bc' };
export const Point = { A: 'a', B: 'b', C: 'c' };
export const View = { EDIT: 0, RESULTS: 1 };

// Actions & Action Creators

export const SET_SIDE = 'trig/calc/SET_SIDE';
export const setSide = (side, length) => ({ type: SET_SIDE, side, length });

export const SET_ANGLE = 'trig/calc/SET_ANGLE';
export const setAngle = (point, angle) => ({ type: SET_ANGLE, point, angle });

export const UNSET_SIDE = 'trig/calc/UNSET_SIDE';
export const unsetSide = side => ({ type: UNSET_SIDE, side });

export const UNSET_ANGLE = 'trig/calc/UNSET_ANGLE';
export const unsetAngle = point => ({ type: UNSET_ANGLE, point });

// Action Creators
export const SELECT_TRIANGLE = 'trig/ui/SELECT_TRIANGLE';
export const selectTriangle = () => ({ type: SELECT_TRIANGLE });

export const UNSELECT_ELEMENT = 'trig/ui/UNSELECT_ELEMENT';
export const unselectElement = () => ({ type: UNSELECT_ELEMENT });

export const SELECT_POINT = 'trig/ui/SELECT_POINT';
export const selectPoint = point => ({ type: SELECT_POINT, point });

export const SELECT_SIDE = 'trig/ui/SELECT_SIDE';
export const selectSide = side => ({ type: SELECT_SIDE, side });

const init = {
  // Default no set measurements
  // Up to 3 sides, 2 sides + 1 angle, or 1 side + 2 angles
  // Lengths can be any positive number, but the sum of the two smaller lengths
  //   must be greater than the larger length.
  // Angles can be between 0 and PI non-inclusive
  ab: { length: 10, pinned: false, label: 'AB' },
  ac: { length: 10, pinned: false, label: 'AC' },
  bc: { length: 10, pinned: false, label: 'BC' },
  a: { angle: PI / 3, pinned: false, label: 'A', x: 20, y: 100 },
  b: { angle: PI / 3, pinned: false, label: 'B', x: 100, y: 100 },
  c: { angle: PI / 3, pinned: false, label: 'C', x: 60, y: 20 },

  selectedElement: '', // Point, Side, "triangle", or "".
  showWork: false,
  currentView: View.EDIT,
};

// Invalid measurements and lengths should return unchanged. Error messages
// should happen in form validation.

// Set Measurement
//   Make sure it's possible. (If it's not, return unchanged. Error messages
//     should happen in form validation).
//   Update measurement.
//   Set pinned = true
//   Update coords of related points based on current coords.
//   Scale triangle as necessary.
//
export default function app(state = init, action = {}) {
  switch (action.type) {
    case SET_ANGLE: {
      // Make sure it's possible. If not, return unchanged.
      // Update measurement, set pinned = true
      // If this is the only measurement set, choose the second and third angle.
      // If one angle is already set, calculate the third angle.
      // If zero angles and two sides are set, calculate the third side, then both angles.
      // Calculate coords.

      const newState =
        Object.assign({}, state, { [action.point]: action.angle });
      const numSidesSet = (!!newState.ab) + (!!newState.ac) + (!!newState.bc);
      const numAnglesSet = (!!newState.a) + (!!newState.b) + (!!newState.c);
      if (numSidesSet === 3) return state;
      if (numSidesSet === 2 && numAnglesSet === 2) return state;
      if (numAnglesSet === 3) return state;
      if (newState.a + newState.b + newState.c >= Math.PI) return state;
      return newState;
    }
    case SET_SIDE: {
      // Make sure it's possible. If not, return unchanged.
      // Update measurement, set pinned = true.
      // Calculate measurements.
      // Calculate coords.
      const newState =
        Object.assign({}, state, { [action.side]: action.length });
      const numSidesSet = (!!newState.ab) + (!!newState.ac) + (!!newState.bc);
      const numAnglesSet = (!!state.a) + (!!state.b) + (!!state.c);
      if (numSidesSet + numAnglesSet > 3) return state;
      return newState;
    }
    case UNSET_SIDE:
      return Object.assign({}, state, {
        [action.side]: Object.assign({}, state[action.side], { pinned: false }),
      });
    case UNSET_ANGLE:
      return Object.assign({}, state, {
        [action.point]: Object.assign({}, state[action.point], { pinned: false }),
      });
    case SELECT_TRIANGLE:
      return Object.assign({}, state, { selectedElement: 'triangle' });
    case SELECT_SIDE:
      return Object.assign({}, state, { selectedElement: action.side });
    case SELECT_POINT:
      return Object.assign({}, state, { selectedElement: action.point });
    case UNSELECT_ELEMENT:
      return Object.assign({}, state, { selectedElement: '' });
    default:
      return state;
  }
}
