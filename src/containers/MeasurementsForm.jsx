import React from 'react'
import { connect } from 'react-redux'
import MeasurementInput from '../components/MeasurementInput'
import RadioList from '../components/RadioList'
import { setSide, setAngle, Side, Point, setAngleUnit } from '../modules/app'
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
          error={measurement.error}
          disabled={measurement.disabled}
        />
      )
    })}
  </form>
)

const fields = ['a', 'b', 'c', 'A', 'B', 'C']

const mapStateToProps = (state) => {
  const errors = getErrors(state) || {}
  const hasErrors = Object.keys(errors).length > 0
  const m = inferMeasurements(state)
  const props = {}
  fields.forEach(field => {
    const computed = !!m[field] && !state[field]
    let text = state[field]
    if (computed && m[field] >= 100) {
      text = m[field].toFixed(1)
    } else if (computed && m[field] < 100) {
      text = m[field].toPrecision(4)
    }
    const error = errors[field]
    const disabled = hasErrors && !error
    props[field] = { text, computed, error, disabled }
  })
  return props
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

const mergeProps = (sp, dp) => {
  const props = {}
  fields.forEach(f => {
    props[f] = {
      text: sp[f].text,
      computed: sp[f].computed,
      error: sp[f].error,
      disabled: sp[f].disabled,
      set: dp[f].set
    }
  })
  return props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MeasurementsForm)
