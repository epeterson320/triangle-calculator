import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './MeasurementInput.scss'

const DELAY = 600 // ms

class MeasurementInput extends Component {
  constructor (props) {
    super(props)
    this.state = { text: props.text || '' }

    this.onChange = this.onChange.bind(this)
    this.onClear = this.onClear.bind(this)
    this.requestNotify = this.requestNotify.bind(this)
    this.notify = this.notify.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ text: nextProps.text || '' })
  }

  // Local handler for input changes. Will not immediately call props.onChange
  onChange (e) {
    if (this.props.computed) return
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
    this.props.onChange(this.state.text)
  }

  render () {
    const { label, computed, error, disabled } = this.props
    const { text } = this.state
    const hideButton = computed || !text
    const hideError = !error

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor={label}>{label}</label>
        <input
          id={label}
          className={classNames(styles.input, {
            [styles.computed]: computed,
            [styles.disabled]: disabled
          })}
          onChange={this.onChange}
          value={text}
          readOnly={computed || disabled}
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
        <label
          className={classNames(styles.error, { [styles.hidden]: hideError })}
          htmlFor={label}
        >
          {error}
        </label>
      </fieldset>
    )
  }
}

MeasurementInput.defaultProps = {
  onChange: () => {},
  computed: false,
  error: '',
  disabled: false
}
export default MeasurementInput
