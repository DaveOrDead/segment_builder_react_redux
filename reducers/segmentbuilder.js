import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_RULE } from '../actions/segmentbuilder'

export default function segmentBuilder(state = {}, action) {

  state.rules = state.rules || {};

  switch(action.type) {
    case ADD_RULE:
      console.log('reducer add rule');
      var ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
      var ruleQualifierId = action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id;
      var ruleCriteria = action.ruleCriteria || '';
      state.rules[action.ruleKey] = {
        ruleTypeId: ruleTypeId,
        ruleQualifierId: ruleQualifierId,
        ruleCriteria: ruleCriteria
      };
      return state;
    case REMOVE_RULE:
      delete state.rules[action.ruleKey];
      return state;
    case SET_RULE_TYPE:
      var ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
      state.rules[action.ruleKey] = {
        ruleTypeId: ruleTypeId,
        ruleQualifierId: state.ruleQualifiersForType[ruleTypeId][0].id,
        ruleCriteria: ''
      };
      return state;
    case SET_RULE_QUALIFIER:
      state.rules[action.ruleKey].ruleQualifierId = action.ruleQualifierId;
      return state;
    case SET_RULE_CRITERIA:
      state.rules[action.ruleKey].ruleCriteria = action.ruleCriteria;
      return state;
    default:
        return state;
  }
}