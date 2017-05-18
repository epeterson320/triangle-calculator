import React, { PureComponent } from 'react'
import classNames from 'classnames'

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
      <div className='DebouncedTextInput__container'>
        <label className='DebouncedTextInput__label' htmlFor={id}>{label}</label>
        <input
          id={id}
          className={classNames('DebouncedTextInput__input', {
            'DebouncedTextInput__input--computed': computed,
            'DebouncedTextInput__input--disabled': disabled
          })}
          onChange={this.onChange}
          value={text}
          readOnly={computed || disabled}
        />
        <button
          className={classNames(
            'DebouncedTextInput__clear',
            { hidden: computed || !text }
          )}
          onClick={this.onClear}
          type='button'
          tabIndex={-1}
        >
          <svg fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
        </button>
        <div
          className={classNames(
            'DebouncedTextInput__error',
            { hidden: !error }
          )}
          htmlFor={label}
        >
          {error}
        </div>
      </div>
    )
  }
}
