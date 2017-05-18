import React from 'react'
import { shallow } from 'enzyme'
import CharInput from './CharInput'

function render (_props) {
  const props = Object.assign({}, { id: 'ID', char: 'A' }, _props)
  return shallow(<CharInput {...props} />)
}

describe('<CharInput />', () => {
  it('Has the right DOM components', () => {
    const el = render()
    expect(el.find('input').length).toBe(1)
    expect(el.find('label').length).toBe(1)
  })

  it('Takes a char prop', () => {
    const el = render({ char: 'B' })
    expect(el.find('input').prop('value')).toBe('B')
  })

  it('Publishes inputs, uppercase, to an onChange listener', () => {
    const onChange = jest.fn()
    const el = render({ char: 'B', onChange })
    el.find('input').simulate('keyDown', { key: 'z' })
    expect(onChange).toHaveBeenLastCalledWith('ID', 'Z')
    el.find('input').simulate('keyDown', { keyCode: 122 })
    expect(onChange).toHaveBeenLastCalledWith('ID', 'Z')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('Blinks cursor when focused and stops blinking when it loses focus', () => {
    const BLINK_RATE = 500
    jest.useFakeTimers()
    const el = render()
    const input = el.find('input')
    // When constructed, it's not blinking
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(false)

    // When it's not clicked, it stays not blinking
    jest.runTimersToTime(BLINK_RATE + 20)
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(false)

    // When it's clicked, it starts blinking
    input.simulate('focus')
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(true)
    jest.runTimersToTime('2')
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(true)
    jest.runTimersToTime(BLINK_RATE)
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(false)
    jest.runTimersToTime(BLINK_RATE)
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(true)

    // When it loses focus, it stops blinking
    el.find('input').simulate('blur')
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(false)
    jest.runTimersToTime(BLINK_RATE)
    expect(el.find('input').hasClass('CharInput__input--cursor')).toBe(false)
  })
})
