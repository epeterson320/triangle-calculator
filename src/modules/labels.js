export const RENAME_POINT = 'labels/RENAME_POINT'
export const renamePoint = (point, name) => ({ type: RENAME_POINT, point, name })

const init = { A: 'A', B: 'B', C: 'C' }

export default function reduce (state = init, action = {}) {
  switch (action.type) {
    case RENAME_POINT: {
      const { point, name } = action
      return Object.assign({}, state, { [point]: name })
    }
    default: {
      return state
    }
  }
}
