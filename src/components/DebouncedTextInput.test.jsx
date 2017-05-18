import React from 'react'
import { shallow } from 'enzyme'
import TextInput from './DebouncedTextInput'

jest.useFakeTimers()

function render (props) {
  const defaults = {
    id: 'ID',
    label: 'foo',
    text: '6.7',
    computed: false,
    disabled: false,
    error: ''
  }
  return shallow(<TextInput {...Object.assign({}, defaults, props)} />)
}

describe('<DebouncedTextInput>', () => {
  it('Has an input element', () => {
    expect(render().find('input')).toHaveLength(1)
  })

  it('Has a label', () => {
    expect(render({ label: 'ABC' }).find('label').text()).toBe('ABC')
  })

  it('Matches the label\'s "for" to the input\'s "id"', () => {
    const el = render()
    expect(el.find('label').prop('htmlFor'))
      .toBe(el.find('input').prop('id'))
  })

  it('Shows the given text in the input', () => {
    expect(render({ text: '42' }).find('input').prop('value')).toBe('42')
  })

  describe('onChange', () => {
    it('Accepts an "onChange" property', () => {
      const el = render({ onChange: jest.fn() })
      expect(el.instance().props.onChange).toBeDefined()
    })

    it('Does not call onChange immediately when content is changed', () => {
      const fn = jest.fn()
      const el = render({ onChange: fn })
      el.find('input').simulate('change', { target: { value: '3' } })
      expect(fn).not.toBeCalled()
    })

    it('Calls onChange, delayed, after a change', () => {
      const fn = jest.fn()
      const el = render({ onChange: fn })
      el.find('input').simulate('change', { target: { value: '3' } })
      jest.runAllTimers()
      expect(fn).toBeCalled()
    })

    it('Debounces the call to onChange if subsequent changes are made', () => {
      const fn = jest.fn()
      const el = render({ onChange: fn })
      el.find('input').simulate('change', { target: { value: '3' } })
      el.find('input').simulate('change', { target: { value: '3.' } })
      el.find('input').simulate('change', { target: { value: '3.5' } })
      jest.runAllTimers()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('Doesn\'t update its text when about to send onChanged', () => {
      const onChange = jest.fn()
      const el = render({ onChange, text: '14.523' })
      el.find('input').simulate('change', { target: { value: '3' } })
      el.setProps({ text: '' })
      expect(el.find('input').prop('value')).toBe('3')
      jest.runAllTimers()
      expect(onChange).toBeCalled()
      expect(el.find('input').prop('value')).toBe('3')
    })

    it('Cancels the onChanged timeout when it becomes computed', () => {
      const onChange = jest.fn()
      const el = render({ onChange, text: '14.523', computed: false })
      el.find('input').simulate('change', { target: { value: '3' } })
      expect(el.find('input').prop('value')).toBe('3')
      el.setProps({ text: '15', computed: true })
      expect(el.find('input').prop('value')).toBe('15')
      jest.runAllTimers()
      expect(onChange).not.toBeCalled()
      expect(el.find('input').prop('value')).toBe('15')
    })
  })

  describe('Clear', () => {
    it('Has a "clear" button', () => {
      expect(render().find('button')).toHaveLength(1)
    })

    it('Hides the "clear" button if the input is empty', () => {
      expect(render({ text: '' }).find('button').hasClass('hidden')).toBe(true)
    })

    it('Shows the "clear" button when text is typed', () => {
      const el = render({ text: '' })
      el.find('input').simulate('change', { target: { value: '3' } })
      expect(el.find('button').hasClass('hidden')).toBe(false)
    })

    it('Calls "onChange" with the empty string when the clear button is clicked', () => {
      const fn = jest.fn()
      const el = render({ onChange: fn })
      el.find('button').simulate('click')
      expect(fn).toBeCalledWith('ID', '')
    })
  })

  describe('computed', () => {
    it('Has a "computed" property', () => {
      expect(render({ computed: true }).instance().props.computed).toBe(true)
    })

    it('Styles the input differently', () => {
      expect(
        render({ computed: true })
          .find('input.DebouncedTextInput__input--computed')
          .length
      ).toBeGreaterThan(0)
    })

    it('Disables input if the value is computed', () => {
      const onChange = jest.fn()
      const el = render({ onChange, text: '14.523', computed: true })
      el.find('input').simulate('change', { target: { value: '3' } })
      jest.runAllTimers()
      expect(onChange).not.toBeCalled()
      expect(el.find('input').prop('value')).toBe('14.523')
    })

    it('Hides the "clear" button if the value is computed', () => {
      expect(render({ computed: true }).find('button').hasClass('hidden')).toBe(true)
    })
  })

  describe('disabled', () => {
    it('Has a "disabled" property', () => {
      expect(render({ disabled: true }).instance().props.disabled).toBe(true)
    })

    it('Disables the input when "disabled" is true', () => {
      expect(render({ disabled: true }).find('input').prop('readOnly')).toBe(true)
    })
  })

  describe('error message', () => {
    it('Has an error message', () => {
      expect(render({ error: 'Invalid' }).find('.DebouncedTextInput__error').text()).toMatch('Invalid')
    })

    it('Hides the error message when a falsy message is provided', () => {
      expect(render({ error: '' }).find('.DebouncedTextInput__error').hasClass('hidden')).toBe(true)
    })
  })
})
