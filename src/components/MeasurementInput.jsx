import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './MeasurementInput.scss'
import Clear from './icon_clear.svg'

const DELAY = 600 // ms

class MeasurementInput extends Component {
  constructor (props) {
    super(props)
    this.state = { text: props.text || '' }

    this.onChange = this.onChange.bind(this)
    this.onChangeLabel = this.onChangeLabel.bind(this)
    this.onClickName = this.onClickName.bind(this)
    this.onClear = this.onClear.bind(this)
    this.requestNotify = this.requestNotify.bind(this)
    this.notify = this.notify.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.computed) {
      clearTimeout(this.timeoutID)
      delete this.timeoutID
    } else if ('timeoutID' in this) {
      return
    }
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

  onClickName (e) {
    if (this.props.onChangeLabel) {
      e.target.focus()
      e.target.select()
    }
  }

  onChangeLabel (e) {
    const newName = e.target.value.toUpperCase()
    if (this.props.onChangeLabel && newName) {
      this.props.onChangeLabel(newName[0])
    }
    e.target.blur()
  }

  requestNotify () {
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(this.notify, DELAY)
  }

  notify () {
    this.props.onChange(this.state.text)
    clearTimeout(this.timeoutID)
    delete this.timeoutID
  }

  render () {
    const { label, computed, error, disabled, onChangeLabel } = this.props
    const { text } = this.state
    const hideButton = computed || !text
    const hideError = !error
    const canChangeLabel = onChangeLabel != null

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.nameLabel} htmlFor={`n-${label}`}>
          {canChangeLabel ? 'Point' : 'Side'}
        </label>
        <input
          className={styles.name}
          id={`n-${label}`}
          value={label}
          onChange={this.onChangeLabel}
          onClick={this.onClickName}
          readOnly={!canChangeLabel}
          maxLength={1}
          tabIndex={-1}
        />
        <label className={styles.label} htmlFor={label}>
          {canChangeLabel ? 'Angle' : 'Length'}
        </label>
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
          <Clear />
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
  disabled: false,
  text: ''
}
export default MeasurementInput
