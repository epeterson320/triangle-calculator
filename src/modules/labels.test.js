import reduce, * as labels from './labels'
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
})
