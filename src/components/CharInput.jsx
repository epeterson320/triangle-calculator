import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './CharInput.scss'

const BLINK_RATE = 500 // ms

export default class CharInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      blinking: false
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.toggleBlink = this.toggleBlink.bind(this)
  }

  onChange (e) {
    const char = e.target.value.substr(-1).toUpperCase()
    if (!char) return
    if ('onChange' in this.props) {
      this.props.onChange(this.props.id, char)
    }
    if (typeof document !== 'undefined') {
      const el = document.getElementById(this.props.id)
      if (el) el.focus()
    }
  }

  onFocus () {
    this.setState({ focused: true, blinking: true })
    this.intervalID = setInterval(this.toggleBlink, BLINK_RATE)
  }

  onBlur () {
    clearInterval(this.intervalID)
    this.setState({ focused: false, blinking: false })
  }

  toggleBlink () {
    this.setState({ focused: true, blinking: !this.state.blinking })
  }

  render () {
    const { id, char } = this.props
    return (
      <div className={styles.container}>
        <label htmlFor={`c${id}`}>Point</label>
        <input
          id={`c${id}`}
          type='text'
          value={char}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          className={classnames({
            [styles.input]: true,
            [styles.focus]: this.state.focused,
            [styles.cursor]: this.state.blinking
          })}
        />
      </div>
    )
  }
}
