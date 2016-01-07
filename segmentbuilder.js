import SegmentBuilder from './containers/SegmentBuilder'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'


const store = configureStore({

      ruleTypes: [
        { id: 'email', name: 'Email Address' },
        { id: 'location', name: 'Location' }
      ],
      ruleQualifiersForType: {
        'email': [
          { id: 'equals', name: 'Equals' },
          { id: 'contains', name: 'Contains' }
        ],
        'location': [
          { id: 'known', name: 'Is known' },
          { id: 'unknown', name: 'Is unknown' }
        ]
      },
      rules: {}

});

function init(domElement) {
  render(
    <Provider store={store}>
      <SegmentBuilder />
    </Provider>, domElement);
}

var $ = (selector) => Array.prototype.slice.call(document.querySelectorAll(selector));

$('segmentbuilder').map((element) => init(element));
