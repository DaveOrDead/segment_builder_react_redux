export const SET_RULE_TYPE                = 'SET RULE TYPE'
export const SET_RULE_CRITERIA            = 'SET RULE CRITERIA'
export const SET_RULE_QUALIFIER           = 'SET RULE QUALIFIER'
export const REMOVE_RULE                  = 'REMOVE RULE'
export const ADD_INITIAL_RULE_FOR_GROUP   = 'ADD INITIAL RULE FOR GROUP'
export const ADD_RULE_GROUP               = 'ADD RULE GROUP'
export const ADD_RULE                     = 'ADD RULE'


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

export function addInitialRuleForGroup(ruleTypeId, ruleGroupIndex) {
  return {
    type: ADD_INITIAL_RULE_FOR_GROUP
  ,
    ruleTypeId,
    ruleGroupIndex
  }
}

export function addRule(ruleGroupIndex) {
  return {
    type: ADD_RULE,
    ruleGroupIndex
  }
}

  export function addRuleGroup(ruleGroupIndex) {
  return {
    type: ADD_RULE_GROUP,
    ruleGroupIndex
  }
}

