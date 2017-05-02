import React from 'react'
import { connect } from 'react-redux'
import MeasurementInput from '../components/MeasurementInput'
import RadioList from '../components/RadioList'
import {
  setSide, setAngle, unsetSide, unsetAngle, Side, Point, setAngleUnit
} from '../modules/app'
import { inferMeasurements, getErrors } from '../geometry/triangleInfo'
import { DEG, RAD } from '../geometry/Metric'

const radioOpts = [
  { label: 'Degrees', value: DEG, default: true },
  { label: 'Radians', value: RAD }
]

const MeasurementsForm = (props) => (
  <form>
    <RadioList opts={radioOpts} onChange={props.setUnit} />
    {['A', 'B', 'C', 'a', 'b', 'c'].map(key => {
      const measurement = props[key]
      return (
        <MeasurementInput
          key={key}
          label={key}
          text={measurement.text}
          onChange={measurement.set}
          computed={measurement.computed}
        />
      )
    })}
  </form>
)

const mapStateToProps = (state) => {
  const m = inferMeasurements(state)
  const errors = getErrors(state)
  return {
    a: { text: (m.a || '').toString(), computed: !!m.a && !state.a, error: errors.a },
    b: { text: (m.b || '').toString(), computed: !!m.b && !state.b, error: errors.b },
    c: { text: (m.c || '').toString(), computed: !!m.c && !state.c, error: errors.c },
    A: { text: (m.A || '').toString(), computed: !!m.A && !state.A, error: errors.A },
    B: { text: (m.B || '').toString(), computed: !!m.B && !state.B, error: errors.B },
    C: { text: (m.C || '').toString(), computed: !!m.C && !state.C, error: errors.C }
  }
}

const mapDispatchToProps = (dispatch) => {
  const action = (creator, element) => text =>
    dispatch(creator(element, text))

  return {
    A: { set: action(setAngle, Point.A) },
    B: { set: action(setAngle, Point.B) },
    C: { set: action(setAngle, Point.C) },
    a: { set: action(setSide, Side.a) },
    b: { set: action(setSide, Side.b) },
    c: { set: action(setSide, Side.c) },
    setUnit: (unit) => { dispatch(setAngleUnit(unit)) }
  }
}

const mergeProps = (sp, dp) => ({ // state props, dispatch props
  a: { text: sp.a.text, computed: sp.a.computed, error: sp.a.error, set: dp.a.set },
  b: { text: sp.b.text, computed: sp.b.computed, error: sp.b.error, set: dp.b.set },
  c: { text: sp.c.text, computed: sp.c.computed, error: sp.c.error, set: dp.c.set },
  A: { text: sp.A.text, computed: sp.A.computed, error: sp.A.error, set: dp.A.set },
  B: { text: sp.B.text, computed: sp.B.computed, error: sp.B.error, set: dp.B.set },
  C: { text: sp.C.text, computed: sp.C.computed, error: sp.C.error, set: dp.C.set },
  setUnit: dp.setUnit
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MeasurementsForm)
