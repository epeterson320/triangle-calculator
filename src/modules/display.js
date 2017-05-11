// Actions & Action Creators
export const SHOW_CCENTER = 'display/SHOW_CCENTER'
export const showCCenter = (show) => ({ type: SHOW_CCENTER, show })

export const SHOW_ICENTER = 'display/SHOW_ICENTER'
export const showICenter = (show) => ({ type: SHOW_ICENTER, show })

export const SHOW_OCENTER = 'display/SHOW_OCENTER'
export const showOCenter = (show) => ({ type: SHOW_OCENTER, show })

export const SHOW_CENTROID = 'display/SHOW_CENTROID'
export const showCentroid = (show) => ({ type: SHOW_CENTROID, show })

export const SHOW_EULER = 'display/SHOW_EULER'
export const showEuler = (show) => ({ type: SHOW_EULER, show })

const init = {
  cCenter: false,
  iCenter: false,
  oCenter: false,
  centroid: false,
  euler: false
}

// Reducer
export default function reduce (state = init, action = {}) {
  switch (action.type) {
    case SHOW_CCENTER:
      return Object.assign({}, state, { cCenter: action.show })
    case SHOW_ICENTER:
      return Object.assign({}, state, { iCenter: action.show })
    case SHOW_OCENTER:
      return Object.assign({}, state, { oCenter: action.show })
    case SHOW_CENTROID:
      return Object.assign({}, state, { centroid: action.show })
    case SHOW_EULER:
      return Object.assign({}, state, { euler: action.show })
    default:
      return state
  }
}
