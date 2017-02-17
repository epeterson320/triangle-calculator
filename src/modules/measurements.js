// Enums
export const Side = { AB: 'ab', AC: 'ac', BC: 'bc' };
export const Point = { A: 'a', B: 'b', C: 'c' };

// Actions & Action Creators

export const SET_SIDE = 'trig/calc/SET_SIDE';
export const setSide = (side, length) => ({ type: SET_SIDE, side, length });

export const SET_ANGLE = 'trig/calc/SET_ANGLE';
export const setAngle = (point, angle) => ({ type: SET_ANGLE, point, angle });

export const UNSET_SIDE = 'trig/calc/UNSET_SIDE';
export const unsetSide = side => ({ type: UNSET_SIDE, side });

export const UNSET_ANGLE = 'trig/calc/UNSET_ANGLE';
export const unsetAngle = point => ({ type: UNSET_ANGLE, point });

/* const RENAME_POINT = 'trig/calculator/RENAME_POINT';
const DRAG_POINT = 'trig/calculator/DRAG_POINT';
const DRAG_ROTATE = 'trig/calculator/DRAG_ROTATE';
const DRAG_PAN = 'trig/calculator/DRAG_PAN';
const SELECT_VIEW = 'trig/calculator/SELECT_VIEW';
const SHOW_WORK = 'trig/calculator/SHOW_WORK'; */

// Reducer

const init = {
  // Default no set measurements
  // Up to 3 sides, 2 sides + 1 angle, or 1 side + 2 angles
  // Lengths can be any positive number
  // Angles can be between 0 and 180 non-inclusive
  // Unset lengths or angles are 0
  ab: 0, ac: 0, bc: 0, a: 0, b: 0, c: 0, selected: false,

  /*
  Addl fields to add as app grows:
  aLabel: 'A',
  bLabel: 'B',
  cLabel: 'C',
  dx: 0, // Translate X in viewport
  dy: 0, // Translate Y in viewport
  θ: 0, // Rotate in viewport
  showWork: false,
  currentView: edit | results
  */
};

export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case SET_ANGLE: {
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
      const newState =
        Object.assign({}, state, { [action.side]: action.length });
      const numSidesSet = (!!newState.ab) + (!!newState.ac) + (!!newState.bc);
      const numAnglesSet = (!!state.a) + (!!state.b) + (!!state.c);
      if (numSidesSet + numAnglesSet > 3) return state;
      return newState;
    }
    case UNSET_SIDE:
      return Object.assign({}, state, { [action.side]: 0 });
    case UNSET_ANGLE:
      return Object.assign({}, state, { [action.point]: 0 });
    default:
      return state;
  }
}
