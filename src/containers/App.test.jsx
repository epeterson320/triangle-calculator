import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

describe('<App />', () => {
  it('Has a root div', () => {
    expect(shallow(<App />).find('div.app').length).toBe(1)
  })
})
