import expect from 'expect'
import segmentbuilder from '../../reducers/segmentbuilder'
import { ADD_RULE } from '../../actions/segmentbuilder'
import { initialState } from '../../data/segmentbuilderconfig'

describe('reducers', () => {
  describe('segmentbuilder', () => {
    it('should handle initial state', () => {
      expect(segmentbuilder(undefined, {})).toBe(initialState)
    })

    it('should handle ADD_RULE', () => {
      let addRuleAction =  {
        type: ADD_RULE,
         ruleGroupIndex: 0
       }
       let expectedRulesForFirstGroup = {
            Rules : [
                {
                    id: '0',
                    ruleTypeId: 'default',
                    ruleQualifierId: null,
                    ruleCriteria: '',
                    ruleGroupIndex: 0
                }
            ]
       }
       expect(segmentbuilder(initialState, addRuleAction).RuleGroups[0]).toEqual(expectedRulesForFirstGroup)
    })
  })
})