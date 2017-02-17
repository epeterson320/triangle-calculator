// Action Creators
export const SELECT_TRIANGLE = 'trig/calc/SELECT_TRIANGLE';
export const selectTriangle = () => ({ type: SELECT_TRIANGLE });

export const UNSELECT_TRIANGLE = 'trig/calc/UNSELECT_TRIANGLE';
export const unselectTriangle = () => ({ type: UNSELECT_TRIANGLE });

// Reducer
const init = { selected: false };

export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case SELECT_TRIANGLE:
      return Object.assign({}, state, { selected: true });
    case UNSELECT_TRIANGLE:
      return Object.assign({}, state, { selected: false });
    default:
      return state;
  }
}
