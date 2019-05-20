// Actions & Action Creators
export const SHOW_CCENTER = 'display/SHOW_CCENTER';
export const showCCenter = shouldShow => ({ type: SHOW_CCENTER, shouldShow });

export const SHOW_ICENTER = 'display/SHOW_ICENTER';
export const showICenter = shouldShow => ({ type: SHOW_ICENTER, shouldShow });

export const SHOW_OCENTER = 'display/SHOW_OCENTER';
export const showOCenter = shouldShow => ({ type: SHOW_OCENTER, shouldShow });

export const SHOW_CENTROID = 'display/SHOW_CENTROID';
export const showCentroid = shouldShow => ({ type: SHOW_CENTROID, shouldShow });

export const SHOW_EULER = 'display/SHOW_EULER';
export const showEuler = shouldShow => ({ type: SHOW_EULER, shouldShow });

const init = {
  cCenter: false,
  iCenter: false,
  oCenter: false,
  centroid: false,
  euler: false,
};

// Reducer
export default function reduce(state = init, action = {}) {
  switch (action.type) {
    case SHOW_CCENTER:
      return { ...state, cCenter: action.shouldShow };
    case SHOW_ICENTER:
      return { ...state, iCenter: action.shouldShow };
    case SHOW_OCENTER:
      return { ...state, oCenter: action.shouldShow };
    case SHOW_CENTROID:
      return { ...state, centroid: action.shouldShow };
    case SHOW_EULER:
      return { ...state, euler: action.shouldShow };
    default:
      return state;
  }
}
