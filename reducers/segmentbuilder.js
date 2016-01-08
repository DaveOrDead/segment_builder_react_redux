import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_RULE } from '../actions/segmentbuilder'

const initialState = {

    ruleTypes: [
        { id: 'default', name: 'Define a rule based on...', isEnabled: false, isDefault: true},
        { id: 'email', name: 'Email Address', isEnabled: true, isDefault: false},
        { id: 'location', name: 'Location', isEnabled: true, isDefault: false}
    ],
    ruleQualifiersForType: {
        'email': [
            { id: 'equals', name: 'Equals',  isEnabled: true, isDefault: false},
            { id: 'contains', name: 'Contains',  isEnabled: true, isDefault: true}
        ],
        'location': [
            { id: 'known', name: 'Is known',  isEnabled: true, isDefault: true },
            { id: 'unknown', name: 'Is unknown',  isEnabled: true, isDefault: false }
        ]
    },
    rules: []
}

export default function segmentBuilder(state = initialState, action) {


    switch(action.type) {
        case ADD_RULE:
        console.log('action = ', action)
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

        const newState = Object.assign({}, state, {rules : newRules});

        return newState;


        case REMOVE_RULE:
          delete state.rules[action.ruleKey];
          return state;

        case SET_RULE_TYPE:

          state.rules[action.ruleKey] = {
            ruleTypeId: action.ruleTypeId || state.ruleTypes[0].id,
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