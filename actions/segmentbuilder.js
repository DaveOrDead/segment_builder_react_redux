export const SET_RULE_TYPE      = 'SET RULE TYPE'
export const SET_RULE_CRITERIA  = 'SET RULE CRITERIA'
export const SET_RULE_QUALIFIER = 'SET RULE QUALIFIER'
export const REMOVE_RULE        = 'REMOVE RULE'
export const ADD_INITIAL_RULE   = 'ADD INITIAL RULE'
export const INIT_AND_RULE      = 'INIT AND RULE'
export const INIT_OR_RULE       = 'INIT OR RULE'


export function setRuleType(ruleId, ruleTypeId, ruleGroupIndex) {
  return {
    type: SET_RULE_TYPE,
    ruleId,
    ruleTypeId,
    ruleGroupIndex
  }
}

export function setRuleQualifier(ruleId, ruleQualifierId, ruleGroupIndex) {
  return {
    type: SET_RULE_QUALIFIER,
    ruleId,
    ruleQualifierId,
    ruleGroupIndex
  }
}

export function removeRule(ruleId, ruleGroupIndex) {
  return {
    type: REMOVE_RULE,
    ruleId,
    ruleGroupIndex
  }
}

export function addInitialRule(ruleTypeId, ruleGroupIndex) {
  return {
    type: ADD_INITIAL_RULE,
    ruleTypeId,
    ruleGroupIndex
  }
}

export function initOrRule(ruleGroupIndex) {
  return {
    type: INIT_OR_RULE,
    ruleGroupIndex
  }
}

  export function initAndRule(ruleGroupIndex) {
  return {
    type: INIT_AND_RULE,
    ruleGroupIndex
  }
}

