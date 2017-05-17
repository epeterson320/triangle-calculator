import React, { PureComponent } from 'react'
import classNames from 'classnames'
import styles from './DebouncedTextInput.scss'
import Clear from './icon_clear.svg'

const DELAY = 600 // ms

export default class TextInput extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { text: props.text || '' }

    this.onChange = this.onChange.bind(this)
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

  requestNotify () {
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(this.notify, DELAY)
  }

  notify () {
    if ('onChange' in this.props) this.props.onChange(this.props.id, this.state.text)
    clearTimeout(this.timeoutID)
    delete this.timeoutID
  }

  render () {
    const { text } = this.state
    const { label, disabled, computed, error, id } = this.props

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input
          id={id}
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
            { [styles.hidden]: computed || !text }
          )}
          onClick={this.onClear}
          type='button'
          tabIndex={-1}
        >
          <Clear />
        </button>
        <div
          className={classNames(styles.error, { [styles.hidden]: !error })}
          htmlFor={label}
        >
          {error}
        </div>
      </fieldset>
    )
  }
}
