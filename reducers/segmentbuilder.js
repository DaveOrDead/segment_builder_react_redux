import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_RULE } from '../actions/segmentbuilder'
import { initialState } from '../data/segmentbuilderconfig'

export default function segmentBuilder(state = initialState, action) {


    switch(action.type) {
        case ADD_RULE:

        var ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
        var ruleQualifierId = action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id;
        var ruleCriteria = action.ruleCriteria || '';
        var ruleId = (state.rules.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1).toString();
        var newRules = [
        {
            id: ruleId,
            ruleTypeId,
            ruleQualifierId,
            ruleCriteria
        },
        ...state.rules
    ];

        return Object.assign({}, state, {rules : newRules});

        case REMOVE_RULE:


         var newRules = state.rules.filter(rule =>
            rule.id !== action.ruleId
        )
        return Object.assign({}, state, {rules : newRules});

        case SET_RULE_TYPE:


          var defaultQualifierId = state.ruleQualifiersForType[action.ruleTypeId].filter(qualifier => qualifier.isDefault)[0].id

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId, ruleQualifierId: defaultQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});

          case SET_RULE_QUALIFIER:

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});


        default:
            return state;
    }
}