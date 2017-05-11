import React from 'react'
import { connect } from 'react-redux'
import MeasurementInput from '../components/MeasurementInput'
import RadioList from '../components/RadioList'
import * as action from '../modules/input'
import { renamePoint } from '../modules/labels'
import solveTriangle from '../selectors/solveTriangle'
import { DEG, RAD, Side, Point } from '../constants'
import styles from './MeasurementsForm.scss'

const { PI } = Math

const radioOpts = [
  { label: 'Degrees', value: DEG, default: true },
  { label: 'Radians', value: RAD }
]

const MeasurementsForm = (props) => (
  <form className={styles.container}>
    <RadioList opts={radioOpts} onChange={props.setAngleUnit} />

    {['A', 'B', 'C', 'c', 'b', 'a'].map(key => {
      const measurement = props[key]
      return (
        <MeasurementInput
          key={key}
          label={measurement.name}
          text={measurement.text}
          onChange={measurement.set}
          onChangeLabel={measurement.onChangeLabel}
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

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  setSide (s, l) { dispatch(action.setSide(s, l)) },
  setAngle (p, l) { dispatch(action.setAngle(p, l)) },
  setAngleUnit (u) { dispatch(action.setAngleUnit(u)) },
  renamePoint (p, n) { dispatch(renamePoint(p, n)) }
})

const mergeProps = (state, { setSide, setAngle, setAngleUnit, renamePoint }) => {
  const { errors, computed } = solveTriangle(state.input)
  const hasErrors = Object.keys(errors).length > 0
  const props = {}

  sides.concat(points).forEach(field => {
    const isComputed = !!computed[field] && !state.input[field]
    let text = state.input[field]
    if (isComputed && state.input.unit === DEG && (field in Point)) {
      text = computed[field] * 180 / PI
    } else if (isComputed) {
      text = computed[field]
    }
    if (isComputed && computed[field] >= 100) {
      text = text.toFixed(1)
    } else if (isComputed && computed[field] < 100) {
      text = text.toPrecision(4)
    }
    const error = errors[field]
    const disabled = hasErrors && !error
    props[field] = { text, computed: isComputed, error, disabled }
  })

  points.forEach(angle => {
    props[angle].name = state.labels[angle]
    props[angle].set = text => setAngle(angle, text)
    props[angle].onChangeLabel = text => renamePoint(angle, text)
  })

  sides.forEach(side => { props[side].set = text => setSide(side, text) })
  props.a.name = state.labels.B + state.labels.C
  props.b.name = state.labels.A + state.labels.C
  props.c.name = state.labels.A + state.labels.B

  props.setAngleUnit = setAngleUnit
  return props
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MeasurementsForm)
