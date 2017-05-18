import React, { Component } from 'react'

export default class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    if ('onChange' in this.props) {
      this.props.onChange(e.target.checked)
    }
  }

  render () {
    return <div className='Checkbox__container'>
      <label className='Checkbox__label'>{this.props.label}</label>
      <input
        type='checkbox'
        className='Checkbox__input'
        onChange={this.onChange}
      />
    </div>
  }
}
