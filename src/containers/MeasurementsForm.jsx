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
    {['A', 'B', 'C', 'c', 'b', 'a'].map(key => {
      const measurement = props[key]
      return (
        <MeasurementInput
          key={key}
          label={measurement.name}
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

const sides = Object.keys(Side)
const points = Object.keys(Point)

const mergeProps = (state, { setSide, setAngle, setAngleUnit }) => {
  const errors = getErrors(state) || {}
  const hasErrors = Object.keys(errors).length > 0
  const m = inferMeasurements(state)
  const props = {}

  sides.concat(points).forEach(field => {
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

  points.forEach(angle => {
    props[angle].name = state.labels[angle]
    props[angle].set = text => setAngle(angle, text)
  })

  sides.forEach(side => { props[side].set = text => setSide(side, text) })
  props.a.name = state.labels.B + state.labels.C
  props.b.name = state.labels.A + state.labels.C
  props.c.name = state.labels.A + state.labels.B

  props.setUnit = setAngleUnit
  return props
}

export default connect(
  state => state,
  dispatch => ({
    setSide (s, l) { dispatch(setSide(s, l)) },
    setAngle (p, l) { dispatch(setAngle(p, l)) },
    setAngleUnit (u) { dispatch(setAngleUnit(u)) }
  }),
  mergeProps
)(MeasurementsForm)
