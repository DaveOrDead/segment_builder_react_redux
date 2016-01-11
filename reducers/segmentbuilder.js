import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_RULE } from '../actions/segmentbuilder'

const initialState = {

    ruleTypes: [
        { id: 'default', name: 'Define a rule based on...', isDisabled: true, isDefault: true},
        { id: 'email', name: 'Email Address'},
        { id: 'location', name: 'Location'}
    ],
    ruleQualifiersForType: {
        'email': [
            { id: 'contains', name: 'contains', isDefault: true, valueControlType: 'textField'},
            { id: 'DoesNotContain', name: 'does not contain' , valueControlType: 'textField'} ,
            { id: 'MatchesExactly', name: 'matches exactly', valueControlType: 'textField'},
            { id: 'DoesNotMatchExactly', name: 'does not match exactly', valueControlType: 'textField'},
            { id: 'StartsWith', name: 'starts with' , valueControlType: 'textField'} ,
            { id: 'DoesNotStartWith', name: 'does not start with', valueControlType: 'textField'},
            { id: 'EndsWith', name: 'ends with', valueControlType: 'textField' },
            { id: 'DoesNotEndWith', name: 'does not end with', valueControlType: 'textField' }
        ],
        'location': [
            { id: "IsKnown", name: "is known", isDefault: true, valueControlType: 'none' },
            { id: "IsNotKnown", name: "is not known", valueControlType: 'none' },
            { id: "IsNear", name: "is near", valueControlType: 'vicinitySelector' },
            { id: "IsIn", name: "is in", valueControlType: 'vicinitySelector' },
            { id: "IsNotIn", name: "is not in", valueControlType: 'vicinitySelector' }
        ]
    },
    rules: []
}

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

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId }) : rule)

          return Object.assign({}, state, {rules : newRules});

          case SET_RULE_QUALIFIER:

          console.log('reducer set new rule qualifier: '+ action.ruleQualifierId)
          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});


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