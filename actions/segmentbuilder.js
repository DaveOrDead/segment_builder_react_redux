export const SET_RULE_TYPE      = 'SET RULE TYPE'
export const SET_RULE_CRITERIA  = 'SET RULE CRITERIA'
export const SET_RULE_QUALIFIER = 'SET RULE QUALIFIER'
export const REMOVE_RULE        = 'REMOVE RULE'
export const ADD_INITIAL_RULE   = 'ADD INITIAL RULE'
export const ADD_AND_RULE       = 'ADD AND RULE'
export const ADD_OR_RULE        = 'ADD OR RULE'


export function setRuleType(ruleId, ruleTypeId) {
  return {
    type: SET_RULE_TYPE,
    ruleId,
    ruleTypeId
  }
}

export function setRuleQualifier(ruleId, ruleQualifierId) {
  return {
    type: SET_RULE_QUALIFIER,
    ruleId,
    ruleQualifierId
  }
}

export function removeRule(ruleId) {
  return {
    type: REMOVE_RULE,
    ruleId
  }
}

export function addInitialRule(ruleTypeId) {
  return {
    type: ADD_INITIAL_RULE,
    ruleTypeId: ruleTypeId
  }
}

export function addOrRule(ruleTypeId) {
  return {
    type: ADD_OR_RULE,
    ruleTypeId: ruleTypeId
  }
}

  export function addAndRule(ruleTypeId) {
  return {
    type: ADD_AND_RULE,
    ruleTypeId: ruleTypeId
  }
}

