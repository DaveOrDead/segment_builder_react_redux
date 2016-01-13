import expect from 'expect'
import segmentbuilder from '../../reducers/segmentbuilder'
import { ADD_RULE } from '../../actions/segmentbuilder'
import { initialState } from '../../data/segmentbuilderconfig'

describe('reducers', () => {
  describe('segmentbuilder', () => {
    it('should handle initial state', () => {
      expect(segmentbuilder(undefined, {})).toBe(initialState)
    })
  })
})