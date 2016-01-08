export const SET_RULE_TYPE      = 'SET RULE TYPE'
export const SET_RULE_CRITERIA  = 'SET RULE CRITERIA'
export const SET_RULE_QUALIFIER = 'SET RULE QUALIFIER'
export const REMOVE_RULE        = 'REMOVE RULE'
export const ADD_RULE           = 'ADD RULE'


export function setRuleType(ruleId, ruleTypeId) {
  return {
    type: SET_RULE_TYPE,
    ruleId,
    ruleTypeId
  }
}

export function setRuleCriteria(ruleId, ruleCriteriaId) {
  return {
    type: SET_RULE_CRITERIA,
    ruleId,
    ruleCriteriaId
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

export function addRule(ruleTypeId) {
  return {
    type: ADD_RULE,
    ruleTypeId: ruleTypeId
  }
}

