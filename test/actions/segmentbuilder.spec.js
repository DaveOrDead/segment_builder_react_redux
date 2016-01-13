import expect from 'expect'
import * as actions from '../../actions/segmentbuilder'

describe('segmentbuilder actions', () => {

  it('setRuleType should create SET_RULE_TYPE action', () => {
    expect(actions.setRuleType('1', 'default', 0)).toEqual({
      type: 'SET RULE TYPE',
      ruleId: '1',
      ruleTypeId: 'default',
      ruleGroupIndex: 0
    })
  })

  it('setRuleQualifier should create SET_RULE_QUALIFIER action', () => {
    expect(actions.setRuleQualifier('1', 'contains', 2)).toEqual({
      type: 'SET RULE QUALIFIER',
      ruleId: '1',
      ruleQualifierId: 'contains',
      ruleGroupIndex: 2
    })
  })

  it('removeRule should create REMOVE_RULE action', () => {
    expect(actions.removeRule('2', 1)).toEqual({
      type: 'REMOVE RULE',
      ruleId: '2',
      ruleGroupIndex: 1
    })
  })

  it('addInitialRuleForGroup should create ADD_INITIAL_RULE_FOR_GROUP action', () => {
    expect(actions.addInitialRuleForGroup('email', 3)).toEqual({
      type: 'ADD INITIAL RULE FOR GROUP',
      ruleTypeId: 'email',
      ruleGroupIndex: 3
    })
  })

  it('addRule should create ADD_RULE action', () => {
    expect(actions.addRule(3)).toEqual({
      type: 'ADD RULE',
      ruleGroupIndex: 3
    })
  })

  it('addRuleGroup should create ADD_RULE_GROUP action', () => {
    expect(actions.addRuleGroup(2)).toEqual({
      type: 'ADD RULE GROUP',
      ruleGroupIndex: 2
    })
  })

})
