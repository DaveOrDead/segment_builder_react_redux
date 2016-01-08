// function createRandomKey() {
//   return new Date().toJSON();
// }

export const SET_RULE_TYPE      = 'SET RULE TYPE'
export const SET_RULE_CRITERIA  = 'SET RULE CRITERIA'
export const SET_RULE_QUALIFIER = 'SET RULE QUALIFIER'
export const REMOVE_RULE        = 'REMOVE RULE'
export const ADD_RULE           = 'ADD RULE'


export function setRuleType(ruleKey, ruleTypeId) {
  return {
    type: SET_RULE_TYPE,
    ruleKey,
    ruleTypeId
  }
}

export function setRuleCriteria(ruleKey, ruleCriteriaId) {
  return {
    type: SET_RULE_CRITERIA,
    ruleKey,
    ruleCriteriaId
  }
}

export function setRuleQualifier(ruleKey, ruleQualifierId) {
  return {
    type: SET_RULE_QUALIFIER,
    ruleKey,
    ruleQualifierId
  }
}

export function removeRule(ruleKey) {
  return {
    type: REMOVE_RULE,
    ruleKey
  }
}

export function addRule() {
  return {
    type: ADD_RULE
    // ruleKey: createRandomKey()
  }
}

