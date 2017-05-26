import reduce, * as labels from './labels'
import { init } from './query'
import { Point } from '../constants'

describe('Label reducer', () => {
  it('returns an initial state', () => {
    const state = reduce()
    expect(state).toBeDefined()
  })

  it('renames points', () => {
    const state0 = reduce()
    const state1 = reduce(state0, labels.renamePoint(Point.B, 'P'))
    expect(state1.B).toBe('P')
  })

  it('initializes labels', () => {
    const location = { search: '?points=[P,Q,R]' }
    const state = reduce(undefined, init(location))
    expect(state).toEqual({ A: 'P', B: 'Q', C: 'R' })
  })
})
