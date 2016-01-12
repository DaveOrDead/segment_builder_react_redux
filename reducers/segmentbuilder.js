import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_INITIAL_RULE, INIT_OR_RULE, INIT_AND_RULE } from '../actions/segmentbuilder'
import { initialState } from '../data/segmentbuilderconfig'

const buildNewRules = (state, action, newProperties) => {

    let ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
    let ruleQualifierId = ruleTypeId !== 'default' ? action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id : null;
    let ruleCriteria = action.ruleCriteria || '';
    let ruleId = (state.rules.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1).toString();

     return [
        ...state.rules,
        {
            id: ruleId,
            ruleTypeId,
            ruleQualifierId,
            ruleCriteria,
            ...newProperties
        }
    ];
}

export default function segmentBuilder(state = initialState, action) {

let updatedNewRules;
let numberOfNewRules;


    switch(action.type) {

        case REMOVE_RULE:

         var newRules = state.rules.filter(rule =>
            rule.id !== action.ruleId
        )

         numberOfNewRules = newRules.length;
         if (numberOfNewRules > 0) {

             updatedNewRules = newRules.map((rule, index) => index === numberOfNewRules - 1 ? Object.assign({}, rule, {disableAddOrRule: false}) : rule );
         }

        return Object.assign({}, state, {rules : updatedNewRules});



        case SET_RULE_TYPE:

          var defaultQualifierId = state.ruleQualifiersForType[action.ruleTypeId].filter(qualifier => qualifier.isDefault)[0].id

          let newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId, ruleQualifierId: defaultQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});



          case SET_RULE_QUALIFIER:

          var newRules = state.rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule)

          return Object.assign({}, state, {rules : newRules});

        case ADD_INITIAL_RULE:
            var newRules = buildNewRules(state, action);

        return Object.assign({}, state, {rules : newRules});

        case INIT_OR_RULE:
        console.log('init the or rule!');
        var newRules = buildNewRules(state, action);

        numberOfNewRules = newRules.length;
        updatedNewRules = newRules.map((rule, index) => index === numberOfNewRules - 2 ? Object.assign({}, rule, {disableAddOrRule: true}) : rule );


        return Object.assign({}, state, {rules: updatedNewRules});

        case INIT_AND_RULE:

           // var newRules = buildNewRules(state, action, { disableAddAndRule: true });
            console.log('added and rule');

        return Object.assign({}, state, {initAndRule: true});


        default:
            return state;
    }
}