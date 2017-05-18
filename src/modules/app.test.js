import reduce from './app'
import reduceDisplay from './display'
import reduceInput, { setSide } from './input'
import reduceLabels from './labels'
import { Side } from '../constants'

describe('Reducer', () => {
  it('returns an initial state', () => {
    const state = reduce()
    expect(state).toBeDefined()
  })

  it('Combines the smaller reducers\' states', () => {
    const state = reduce()
    expect(state.labels).toEqual(reduceLabels())
    expect(state.input).toEqual(reduceInput())
    expect(state.display).toEqual(reduceDisplay())
  })

  it('Dispatches actions to the child reducers', () => {
    const state = reduce(undefined, setSide(Side.a, '40'))
    expect(state.input.a).toBe('40')
  })
})
