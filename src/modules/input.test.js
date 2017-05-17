import reduce, * as app from './input'

import { DEG, RAD, Side, Point } from '../constants'

const { PI } = Math
const { a, b, c } = Side
const { A, B, C } = Point

// Angles for use with tests.
const A30 = (PI / 6).toFixed(3)
const A45 = (PI / 4).toFixed(3)
const A60 = (PI / 3).toFixed(3)
const A90 = (PI / 2).toFixed(3)

describe('Reducer', () => {
  it('returns an initial state', () => {
    const state = reduce()
    expect(state).toBeDefined()
  })

  it('sets sides', () => {
    const state1 = reduce(undefined, app.setSide(a, '2.0'))
    const state2 = reduce(state1, app.setSide(b, '3.4'))
    expect(state2.a).toBe('2.0')
    expect(state2.b).toBe('3.4')
  })

  it('sets angles', () => {
    const state1 = reduce(undefined, app.setAngle(A, A45))
    const state2 = reduce(state1, app.setAngle(B, A30))
    expect(state2.A).toBe(A45)
    expect(state2.B).toBe(A30)
  })

  it('doesn\'t set a third side when one angle is set', () => {
    const state0 = reduce(undefined, app.setSide(a, '3'))
    const state1 = reduce(state0, app.setSide(b, '3'))
    const state2 = reduce(state1, app.setAngle(C, A60))
    const state = reduce(state2, app.setSide(c, '3'))
    expect(state.c).toBe('')
  })

  it('doesn\'t set a second side when two angles are set', () => {
    const state0 = reduce(undefined, app.setSide(a, '3'))
    const state1 = reduce(state0, app.setAngle(B, A60))
    const state2 = reduce(state1, app.setAngle(C, A60))
    const state = reduce(state2, app.setSide(b, '3'))
    expect(state.b).toBe('')
  })

  it('doesn\'t set an angle when three sides are set', () => {
    const state0 = reduce(undefined, app.setSide(a, '3'))
    const state1 = reduce(state0, app.setSide(b, '3'))
    const state2 = reduce(state1, app.setSide(c, '3'))
    const state = reduce(state2, app.setAngle(A, A60))
    expect(state.A).toBe('')
  })

  it('doesn\'t set a second angle when two sides are set', () => {
    const state0 = reduce(undefined, app.setSide(a, '3'))
    const state1 = reduce(state0, app.setSide(b, '3'))
    const state2 = reduce(state1, app.setAngle(A, A45))
    const state = reduce(state2, app.setAngle(B, A45))
    expect(state.B).toBe('')
  })

  it('never sets a third angle', () => {
    const state0 = reduce(undefined, app.setAngle(A, A60))
    const state1 = reduce(state0, app.setAngle(B, A60))
    const state = reduce(state1, app.setAngle(C, A60))
    expect(state.C).toBe('')
  })

  it('overwrites sides', () => {
    const state0 = reduce(undefined, app.setSide(a, '3'))
    const state1 = reduce(state0, app.setSide(b, '3'))
    const state2 = reduce(state1, app.setAngle(A, A60))
    const state = reduce(state2, app.setSide(a, '2.5'))
    expect(state.a).toBe('2.5')
  })

  it('overwrites angles', () => {
    const state0 = reduce(undefined, app.setAngle(A, A60))
    const state1 = reduce(state0, app.setAngle(B, A60))
    const state2 = reduce(state1, app.setSide(a, 4.0))
    const state = reduce(state2, app.setAngle(A, A45))
    expect(state.A).toBe(A45)
  })

  it('sets impossible angles', () => {
    // Try to make a triangle with two right angles
    const state0 = reduce(undefined, app.setAngle(A, A90))
    const state = reduce(state0, app.setAngle(B, A90))
    // Ignore the invalid input
    expect(state.B).toBe(A90)
  })

  it('sets impossible sides', () => {
    const state1 = reduce(undefined, app.setSide(a, '2'))
    const state2 = reduce(state1, app.setSide(b, '1'))
    const state = reduce(state2, app.setSide(c, '1'))
    expect(state.c).toBe('1')
  })

  it('sets invalid input', () => {
    const state = reduce()
    expect(reduce(state, app.setSide(a, 'pickles')).a).toBe('pickles')
    expect(reduce(state, app.setSide(a, '-4.0')).a).toBe('-4.0')
  })

  it('sets the angle unit', () => {
    const s = reduce()
    const s1 = reduce(s, app.setAngleUnit(RAD))
    expect(s1.unit).toBe(RAD)
    const s2 = reduce(s1, app.setAngleUnit(DEG))
    expect(s2.unit).toBe(DEG)
  })

  it('Ignores invalid angle input', () => {
    expect(reduce(undefined, app.setAngleUnit('foo')).unit).not.toBe('foo')
  })

  it('converts text when switching angle units', () => {
    const state1 = reduce(undefined, app.setAngleUnit(DEG))
    const state2 = reduce(state1, app.setAngle(A, '90'))
    const state3 = reduce(state2, app.setAngleUnit(RAD))
    expect(parseFloat(state3.A)).toBeCloseTo(PI / 2)
  })
})
