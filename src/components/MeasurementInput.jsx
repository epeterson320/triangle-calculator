import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './MeasurementInput.scss'
import { DEG, RAD, NONE } from '../geometry/Metric'

const { PI } = Math
const DELAY = 300 // ms

class MeasurementInput extends Component {
  constructor (props) {
    super(props)

    if (props.computedVal) {
      if (props.metric === DEG) {
        this.state = { text: (props.computedVal * 360 / (2 * PI)).toString() }
      } else {
        this.state = { text: props.computedVal.toString() }
      }
    } else {
      this.state = { text: '' }
    }

    this.onChange = this.onChange.bind(this)
    this.onClear = this.onClear.bind(this)
    this.notify = this.notify.bind(this)
    this.requestNotify = this.requestNotify.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.computedVal) {
      const val = (nextProps.metric === DEG)
        ? nextProps.computedVal * 360 / (PI * 2)
        : nextProps.computedVal
      this.setState({ text: val.toString() })
    } else if (this.props.computedVal && !nextProps.computedVal) {
      this.setState({ text: '' })
    } else if (this.props.metric === RAD && nextProps.metric === DEG) {
      const val = parseFloat(this.state.text)
      if (val) {
        this.setState({ text: (val * 360 / (2 * PI)).toString() })
      }
    } else if (this.props.metric === DEG && nextProps.metric === RAD) {
      const val = parseFloat(this.state.text)
      if (val) {
        this.setState({ text: (val * 2 * PI / 360).toString() })
      }
    }
  }

  onChange (e) {
    if (this.props.computedVal) return
    this.setState({ text: e.target.value }, this.requestNotify)
  }

  onClear () {
    this.setState({ text: '' }, this.notify)
  }

  requestNotify () {
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(this.notify, DELAY)
  }

  notify () {
    const text = this.state.text
    if (text) {
      const num = parseFloat(text)
      if (!num) return

      if (this.props.metric === DEG) {
        this.props.onChange(num * 2 * PI / 360)
      } else {
        this.props.onChange(num)
      }
    } else {
      this.props.onClear()
    }
  }

  render () {
    const { label, computedVal } = this.props
    const hideButton = computedVal || !this.state.text

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor={label}>{label}</label>
        <input
          id={label}
          className={classNames(
            styles.input,
            { [styles.computed]: !!computedVal }
          )}
          onChange={this.onChange}
          value={this.state.text}
          readOnly={!!this.props.computedVal}
        />
        <button
          className={classNames(
            styles.button,
            { [styles.hidden]: hideButton }
          )}
          onClick={this.onClear}
          type='button'
          tabIndex={-1}
        >
          Clear
        </button>
      </fieldset>
    )
  }
}

MeasurementInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  computedVal: PropTypes.number,
  metric: PropTypes.string
}

MeasurementInput.defaultProps = {
  onChange: () => {},
  onClear: () => {},
  computedVal: 0,
  metric: NONE
}

export default MeasurementInput
