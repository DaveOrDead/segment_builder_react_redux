import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ConditionButton from '../../components/ConditionButton'


function setup() {
  const props = {
    text: 'Condition Me!',
    handleClick: expect.createSpy(),
    isDisabled: false,
    isHidden: true
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(<ConditionButton {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('ConditionButton', () => {
    it('should render correctly', () => {
      const { output } = setup()

      expect(output.type).toBe('button')
      expect(output.props.className).toBe('condition-button')
      expect(output.props.hidden).toBe(true)
      expect(output.props.disabled).toBe(false)

    })

    it('should call handleClick when button clicked', () => {
      const { output, props } = setup()
      output.props.onClick('')
      expect(props.handleClick.calls.length).toBe(1)
    })
  })
})
