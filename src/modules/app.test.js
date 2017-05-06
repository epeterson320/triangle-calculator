import reduce, * as app from './app'

import { DEG, RAD, NONE } from '../geometry/Metric'

const { Side, Point } = app

const { PI } = Math

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
    const state1 = reduce(undefined, app.setSide(Side.a, '2.0'))
    const state2 = reduce(state1, app.setSide(Side.b, '3.4'))
    expect(state2.a).toBe('2.0')
    expect(state2.b).toBe('3.4')
  })

  it('sets angles', () => {
    const state1 = reduce(undefined, app.setAngle(Point.A, A45))
    const state2 = reduce(state1, app.setAngle(Point.B, A30))
    expect(state2.A).toBe(A45)
    expect(state2.B).toBe(A30)
  })

  it('doesn\'t set a third side when one angle is set', () => {
    const state0 = reduce(undefined, app.setSide(Side.a, '3'))
    const state1 = reduce(state0, app.setSide(Side.b, '3'))
    const state2 = reduce(state1, app.setAngle(Point.C, A60))
    const state = reduce(state2, app.setSide(Side.c, '3'))
    expect(state.c).toBe('')
  })

  it('doesn\'t set a second side when two angles are set', () => {
    const state0 = reduce(undefined, app.setSide(Side.a, '3'))
    const state1 = reduce(state0, app.setAngle(Point.B, A60))
    const state2 = reduce(state1, app.setAngle(Point.C, A60))
    const state = reduce(state2, app.setSide(Side.b, '3'))
    expect(state.b).toBe('')
  })

  it('doesn\'t set an angle when three sides are set', () => {
    const state0 = reduce(undefined, app.setSide(Side.a, '3'))
    const state1 = reduce(state0, app.setSide(Side.b, '3'))
    const state2 = reduce(state1, app.setSide(Side.c, '3'))
    const state = reduce(state2, app.setAngle(Point.A, A60))
    expect(state.A).toBe('')
  })

  it('doesn\'t set a second angle when two sides are set', () => {
    const state0 = reduce(undefined, app.setSide(Side.a, '3'))
    const state1 = reduce(state0, app.setSide(Side.b, '3'))
    const state2 = reduce(state1, app.setAngle(Point.A, A45))
    const state = reduce(state2, app.setAngle(Point.B, A45))
    expect(state.B).toBe('')
  })

  it('never sets a third angle', () => {
    const state0 = reduce(undefined, app.setAngle(Point.A, A60))
    const state1 = reduce(state0, app.setAngle(Point.B, A60))
    const state = reduce(state1, app.setAngle(Point.C, A60))
    expect(state.C).toBe('')
  })

  it('overwrites sides', () => {
    const state0 = reduce(undefined, app.setSide(Side.a, '3'))
    const state1 = reduce(state0, app.setSide(Side.b, '3'))
    const state2 = reduce(state1, app.setAngle(Point.A, A60))
    const state = reduce(state2, app.setSide(Side.a, '2.5'))
    expect(state.a).toBe('2.5')
  })

  it('overwrites angles', () => {
    const state0 = reduce(undefined, app.setAngle(Point.A, A60))
    const state1 = reduce(state0, app.setAngle(Point.B, A60))
    const state2 = reduce(state1, app.setSide(Side.a, 4.0))
    const state = reduce(state2, app.setAngle(Point.A, A45))
    expect(state.A).toBe(A45)
  })

  it('sets impossible angles', () => {
    // Try to make a triangle with two right angles
    const state0 = reduce(undefined, app.setAngle(Point.A, A90))
    const state = reduce(state0, app.setAngle(Point.B, A90))
    // Ignore the invalid input
    expect(state.B).toBe(A90)
  })

  it('sets impossible sides', () => {
    const state1 = reduce(undefined, app.setSide(Side.a, '2'))
    const state2 = reduce(state1, app.setSide(Side.b, '1'))
    const state = reduce(state2, app.setSide(Side.c, '1'))
    expect(state.c).toBe('1')
  })

  it('sets invalid input', () => {
    const state = reduce()
    expect(reduce(state, app.setSide(Side.a, 'pickles')).a).toBe('pickles')
    expect(reduce(state, app.setSide(Side.a, '-4.0')).a).toBe('-4.0')
  })

  it('sets the angle unit', () => {
    expect(reduce(undefined, app.setAngleUnit(DEG)).angleUnit).toBe(DEG)
    expect(reduce(undefined, app.setAngleUnit(RAD)).angleUnit).toBe(RAD)
  })

  it('converts text when switching angle units', () => {
    const state1 = reduce(undefined, app.setAngleUnit(DEG))
    const state2 = reduce(state1, app.setAngle(Point.A, '90'))
    const state3 = reduce(state2, app.setAngleUnit(RAD))
    expect(parseFloat(state3.A)).toBeCloseTo(PI / 2)
  })

  it('throws away non-angle units', () => {
    const state0 = reduce()
    const state1 = reduce(state0, app.setAngleUnit(NONE))
    expect(state0.angleUnit).toBe(state1.angleUnit)
  })

  it('renames points', () => {
    const state0 = reduce()
    const state1 = reduce(state0, app.renamePoint(Point.B, 'P'))
    expect(state1.labels.B).toBe('P')
  })

  it('toggles the display of the circumcenter', () => {
    expect(reduce(undefined, app.showCCenter(true)).showCCenter).toBe(true)
    expect(reduce(undefined, app.showCCenter(false)).showCCenter).toBe(false)
  })
})

describe('Action Creators', () => {
  it('creates an action to set a side length', () => {
    const side = Side.a
    const length = '50.0'
    expect(app.setSide(side, length))
      .toEqual({ type: app.SET_SIDE, side, length })
  })

  it('creates an action to set an angle', () => {
    const point = Point.A
    const angle = A45
    expect(app.setAngle(point, angle))
      .toEqual({ type: app.SET_ANGLE, point, angle })
  })

  it('creates an action to set the metric', () => {
    expect(app.setAngleUnit(DEG))
      .toEqual({ type: app.SET_ANGLE_UNIT, unit: DEG })
    expect(app.setAngleUnit(RAD))
      .toEqual({ type: app.SET_ANGLE_UNIT, unit: RAD })
  })

  it('creates actions to rename points', () => {
    expect(app.renamePoint(Point.A, 'P'))
      .toEqual({ type: app.RENAME_POINT, point: Point.A, name: 'P' })
  })
})
