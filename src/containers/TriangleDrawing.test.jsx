import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import Component, { TriangleDrawing } from './TriangleDrawing'
import app from '../modules/app'

function getStore () {
  return createStore(app)
}

describe('<TriangleDrawing />', () => {
  it('Renders without error', () => {
    shallow(<TriangleDrawing />)
  })

  it('Connects to redux without error', () => {
    const store = getStore()
    shallow(<Provider store={store}><Component /></Provider>)
  })
})
