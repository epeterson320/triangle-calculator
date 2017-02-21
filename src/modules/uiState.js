// Action Creators
export const SELECT_TRIANGLE = 'trig/ui/SELECT_TRIANGLE';
export const selectTriangle = () => ({ type: SELECT_TRIANGLE });

export const UNSELECT_TRIANGLE = 'trig/ui/UNSELECT_TRIANGLE';
export const unselectTriangle = () => ({ type: UNSELECT_TRIANGLE });

export const SELECT_POINT = 'trig/ui/SELECT_POINT';
export const selectPoint = point => ({ type: SELECT_POINT, point });

export const SELECT_SIDE = 'trig/ui/SELECT_SIDE';
export const selectSide = side => ({ type: SELECT_SIDE, side });

// Reducer
const init = {
  selected: '',
};

export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case SELECT_TRIANGLE:
      return Object.assign({}, state, { selected: 'triangle' });
    case SELECT_SIDE:
      return Object.assign({}, state, { selected: action.side });
    case SELECT_POINT:
      return Object.assign({}, state, { selected: action.point });
    case UNSELECT_TRIANGLE:
      return Object.assign({}, state, { selected: '' });
    default:
      return state;
  }
}
