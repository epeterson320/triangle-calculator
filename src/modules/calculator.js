// Actions & Action Creators

export const SET_SIDE = 'trig/calculator/SET_SIDE';
export function setSide(side, length) {
  return { type: SET_SIDE, side, length };
}

export const SET_ANGLE = 'trig/calculator/SET_ANGLE';
export function setAngle(point, angle) {
  return { type: SET_ANGLE, point, angle };
}

export const UNSET_SIDE = 'trig/calculator/UNSET_SIDE';
export function unsetSide(side) {
  return { type: UNSET_SIDE, side };
}

export const UNSET_ANGLE = 'trig/calculator/UNSET_ANGLE';
export function unsetAngle(point) {
  return { type: UNSET_ANGLE, point };
}

/* const RENAME_POINT = 'trig/calculator/RENAME_POINT';
const DRAG_POINT = 'trig/calculator/DRAG_POINT';
const CLICK_TRIANGLE = 'trig/calculator/CLICK_TRIANGLE';
const DRAG_ROTATE = 'trig/calculator/DRAG_ROTATE';
const DRAG_PAN = 'trig/calculator/DRAG_PAN';
const SELECT_VIEW = 'trig/calculator/SELECT_VIEW';
const SHOW_WORK = 'trig/calculator/SHOW_WORK'; */

// Reducer

export const Side = { AB: 'AB', AC: 'AC', BC: 'BC' };
export const Point = { A: 'A', B: 'B', C: 'C' };

const init = {
  // Default no set measurements
  // Up to 3 sides, 2 sides + 1 angle, or 1 side + 2 angles
  setAngles: [],
  setSides: [],
  /*
  a: 'A', // Point names (default A B C)
  b: 'B',
  c: 'C',
  dx: 0,
  dy: 0,
  θ: 0,
  showWork: false, */
};

export default function reducer(state = init, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case SET_SIDE: {
      return state;
    }
    default:
      return state;
  }
}
