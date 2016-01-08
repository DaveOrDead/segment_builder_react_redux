import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_RULE } from '../actions/segmentbuilder'

const initialState = {

      ruleTypes: [
        { id: 'email', name: 'Email Address' },
        { id: 'location', name: 'Location' }
      ],
      ruleQualifiersForType: {
        'email': [
          { id: 'equals', name: 'Equals' },
          { id: 'contains', name: 'Contains' }
        ],
        'location': [
          { id: 'known', name: 'Is known' },
          { id: 'unknown', name: 'Is unknown' }
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
          var newRules = [
            {
                ruleTypeId,
                ruleQualifierId,
                ruleCriteria
            },
            ...state.rules
          ];
          const newState = Object.assign({}, state, {rules : newRules});

          return newState;
      //     return [
      //   {
      //       ruleTypeId: action.ruleKey,
      //       ruleQualifierId: 1,
      //       ruleCriteria: 2
      //   },
      //   ...state
      // ]

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