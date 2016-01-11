import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_INITIAL_RULE, ADD_OR_RULE, ADD_AND_RULE } from '../actions/segmentbuilder'
import { initialState } from '../data/segmentbuilderconfig'

const buildNewRules = (state, action, newProperties) => {

    let ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
    let ruleQualifierId = action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id;
    let ruleCriteria = action.ruleCriteria || '';
    let ruleId = (state.rules.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1).toString();

     return [
        {
            id: ruleId,
            ruleTypeId,
            ruleQualifierId,
            ruleCriteria,
            ...newProperties
        },
        ...state.rules
    ];
}

export default function segmentBuilder(state = initialState, action) {

    switch(action.type) {

        case REMOVE_RULE:

         var newRules = state.rules.filter(rule =>
            rule.id !== action.ruleId
        )

         let updatedNewRules;

         const numberOfNewRules = newRules.length;
         if (numberOfNewRules > 0) {

             updatedNewRules = newRules.map((rule, index) => index === numberOfNewRules - 1 ? Object.assign({}, rule, {disableAddOrRule: false}) : rule );
         }

        return Object.assign({}, state, {rules : updatedNewRules});



        case SET_RULE_TYPE:

          var defaultQualifierId = state.ruleQualifiersForType[action.ruleTypeId].filter(qualifier => qualifier.isDefault)[0].id

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId, ruleQualifierId: defaultQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});



          case SET_RULE_QUALIFIER:

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});

        case ADD_INITIAL_RULE:
            var newRules = buildNewRules(state, action);

        return Object.assign({}, state, {rules : newRules});

        case ADD_OR_RULE:

            var newRules = buildNewRules(state, action, { disableAddOrRule: true });

        return Object.assign({}, state, {rules : newRules});

        case ADD_AND_RULE:

            var newRules = buildNewRules(state, action, { disableAddAndRule: true });
            console.log('added and rule');

        return Object.assign({}, state, {rules : newRules});


        default:
            return state;
    }
}