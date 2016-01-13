import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import SegmentBuilder from '../../containers/SegmentBuilder'
import configureStore from '../../store/configureStore'

function setup(initialState) {
  const store = configureStore(initialState)
  const app = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <SegmentBuilder />
    </Provider>
  )
  //console.log('app state: ', app.store.getState())
  return {
    app: app,
    buttons: TestUtils.scryRenderedDOMComponentsWithTag(app, 'button'),
    dropdowns: TestUtils.scryRenderedDOMComponentsWithTag(app, 'select')
  }
}

describe('containers', () => {

  describe('SegmentBuilder', () => {

    it('should display initial rule dropdown', () => {
      const { dropdowns } = setup()
      expect(dropdowns.length).toBe(1)
      expect(dropdowns[0].value).toBe('default')
  })

    it('should display the newly added rule', () => {
      const { dropdowns, buttons } = setup()
      //console.log('buttons: ', buttons)
      let initialRule = dropdowns[0]
      initialRule.value = 'location'
      TestUtils.Simulate.keyDown(initialRule, {key: "Enter", keyCode: 13, which: 13});
      expect(dropdowns.length).toBe(1)
      expect(dropdowns[0].value).toBe('location')

      //expect(buttons.length).toBe(3) // OR, AND, Remove
  })

    // it('should display updated count after increment button click', () => {
    //   const { buttons, p } = setup()
    //   TestUtils.Simulate.click(buttons[0])
    //   expect(p.textContent).toMatch(/^Clicked: 1 times/)
    // })

    // it('should display updated count after decrement button click', () => {
    //   const { buttons, p } = setup()
    //   TestUtils.Simulate.click(buttons[1])
    //   expect(p.textContent).toMatch(/^Clicked: -1 times/)
    // })

    // it('shouldnt change if even and if odd button clicked', () => {
    //   const { buttons, p } = setup()
    //   TestUtils.Simulate.click(buttons[2])
    //   expect(p.textContent).toMatch(/^Clicked: 0 times/)
    // })

    // it('should change if odd and if odd button clicked', () => {
    //   const { buttons, p } = setup({ counter: 1 })
    //   TestUtils.Simulate.click(buttons[2])
    //   expect(p.textContent).toMatch(/^Clicked: 2 times/)
    // })
  })
})
