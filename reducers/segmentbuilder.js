import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_INITIAL_RULE, INIT_OR_RULE, INIT_AND_RULE } from '../actions/segmentbuilder'
import { initialState } from '../data/segmentbuilderconfig'

const buildNewRules = (state, action, newProperties) => {

    let ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
    let ruleQualifierId = ruleTypeId !== 'default' ? action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id : null;
    let ruleCriteria = action.ruleCriteria || '';
    let ruleId = (state.RuleGroups[0].Rules.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1).toString();

     return [
        ...state.RuleGroups[0].Rules,
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

let updatedNewRules = [];
let numberOfNewRules = 0;
let newRuleGroups = [];


    switch(action.type) {

        case REMOVE_RULE:

             var newRules = state.RuleGroups[0].Rules.filter(rule => rule.id !== action.ruleId);

             numberOfNewRules = newRules.length;
             if (numberOfNewRules > 0) {

                 updatedNewRules = newRules.map((rule, index) => index === numberOfNewRules - 1 ? Object.assign({}, rule, {disableAddOrRule: false}) : rule );
             }

             newRuleGroups = state.RuleGroups.map((ruleGroup, index) => action.ruleGroupIndex === index ? Object.assign({}, ruleGroup, {Rules : updatedNewRules}) : ruleGroup);

            console.log('remove rule - new rules', updatedNewRules);
          
            return Object.assign({}, state, {RuleGroups : newRuleGroups});



        case SET_RULE_TYPE:

              console.log('hello from set rule type');
              var defaultQualifierId = state.ruleQualifiersForType[action.ruleTypeId].filter(qualifier => qualifier.isDefault)[0].id

              let newRules = state.RuleGroups[0].Rules.map(rule =>
                rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId, ruleQualifierId: defaultQualifierId }) : rule)

              newRuleGroups = state.RuleGroups.map((ruleGroup, index) => action.ruleGroupIndex === index ? Object.assign({}, ruleGroup, {Rules : newRules}) : ruleGroup);

              console.log('new rule groups', newRuleGroups);

              return Object.assign({}, state, {RuleGroups : newRuleGroups});



        case SET_RULE_QUALIFIER:

              var newRules = state.RuleGroups[0].Rules.map(rule =>
              rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule)

              return Object.assign({}, state, {rules : newRules});

        case ADD_INITIAL_RULE:

            var newRules = buildNewRules(state, action);

            newRuleGroups = state.RuleGroups.map((ruleGroup, index) => action.ruleGroupIndex === index ? Object.assign({}, ruleGroup, {Rules : newRules}) : ruleGroup);

            console.log('add initial rule', newRuleGroups);
          
            return Object.assign({}, state, {RuleGroups : newRuleGroups});

        case INIT_OR_RULE:

            var newRules = buildNewRules(state, action);

            numberOfNewRules = newRules.length;
            updatedNewRules = newRules.map((rule, index) => index === numberOfNewRules - 2 ? Object.assign({}, rule, {disableAddOrRule: true}) : rule );
            newRuleGroups = state.RuleGroups.map((ruleGroup, index) => action.ruleGroupIndex === index ? Object.assign({}, ruleGroup, {Rules : updatedNewRules}) : ruleGroup);

            console.log('init or rule', newRuleGroups);
          
            return Object.assign({}, state, {RuleGroups : newRuleGroups});

        case INIT_AND_RULE:

           // var newRules = buildNewRules(state, action, { disableAddAndRule: true });
            console.log('added and rule');

            return Object.assign({}, state, {initAndRule: true});


        default:
            return state;
    }
}