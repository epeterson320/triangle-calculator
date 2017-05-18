import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { shallow } from 'enzyme'
import Component, { MeasurementsForm } from './MeasurementsForm'
import app from '../modules/app'

function getStore () {
  return createStore(app)
}

describe('<MeasurementsForm />', () => {
  it('Renders without error', () => {
    shallow(<MeasurementsForm />)
  })

  it('Connects to redux without error', () => {
    const store = getStore()
    shallow(<Provider store={store}><Component /></Provider>)
  })
})
