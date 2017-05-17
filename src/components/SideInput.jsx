import React, { PureComponent } from 'react'
import DebouncedTextInput from './DebouncedTextInput'
import styles from './SideInput.scss'

export default class SideInput extends PureComponent {
  render () {
    return (
      <div className={styles.container}>
        <span className={styles.label}>{this.props.label}</span>
        <DebouncedTextInput {...this.props} label='Length' />
      </div>
    )
  }
}
