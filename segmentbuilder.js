import SegmentBuilder from './containers/SegmentBuilder'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <SegmentBuilder />
  </Provider>,
  document.getElementById('root')
)


