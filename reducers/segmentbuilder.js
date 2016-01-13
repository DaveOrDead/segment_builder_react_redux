import { SET_RULE_TYPE, SET_RULE_CRITERIA, SET_RULE_QUALIFIER, REMOVE_RULE, ADD_INITIAL_RULE_FOR_GROUP, ADD_RULE, ADD_RULE_GROUP } from '../actions/segmentbuilder'
import { initialState } from '../data/segmentbuilderconfig'

const buildNewRulesAfterInitialRuleAddition = (state, action) => {

    let ruleTypeId = action.ruleTypeId || state.ruleTypes[0].id;
    let ruleQualifierId = ruleTypeId !== 'default' ? action.ruleQualifierId || state.ruleQualifiersForType[ruleTypeId][0].id : null;
    let ruleCriteria = action.ruleCriteria || '';
    let ruleId = (state.RuleGroups[action.ruleGroupIndex].Rules.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1).toString();

     return [
        ...state.RuleGroups[action.ruleGroupIndex].Rules,
        {
            id: ruleId,
            ruleTypeId,
            ruleQualifierId,
            ruleCriteria,
            ruleGroupIndex: action.ruleGroupIndex
        }
    ];
}

const buildNewRulesAfterRuleAddition = (state, action) => {

    let newRules = buildNewRulesAfterInitialRuleAddition(state, action);

    return newRules.map((rule, index) => index === newRules.length - 2 ? Object.assign({}, rule, {disableAddOrRule: true}) : rule );
}

const buildNewRulesAfterRuleRemoval = (state, action) => {

     var newRules = state.RuleGroups[action.ruleGroupIndex].Rules.filter(rule => rule.id !== action.ruleId);
     const numberOfNewRules = newRules.length;

     if (numberOfNewRules > 0) {

         return newRules.map((rule, index) => index === numberOfNewRules - 1 ? Object.assign({}, rule, {disableAddOrRule: false}) : rule );
     }

     return newRules;
}

const buildNewRulesAfterUpdatingTheRuleType = (state, action) => {

    var defaultQualifierId = state.ruleQualifiersForType[action.ruleTypeId].filter(qualifier => qualifier.isDefault)[0].id

    return state.RuleGroups[action.ruleGroupIndex].Rules.map(rule =>
            rule.id === action.ruleId ? Object.assign({}, rule, { ruleTypeId: action.ruleTypeId, ruleQualifierId: defaultQualifierId }) : rule)
}

const buildNewRulesAfterUpdatingTheRuleQualifier = (state, action) => {

    return state.RuleGroups[action.ruleGroupIndex].Rules.map(rule =>
              rule.id === action.ruleId ? Object.assign({}, rule, { ruleQualifierId: action.ruleQualifierId }) : rule);
}

const buildNewRuleGroups = (state, action, newRules) => {

    return state.RuleGroups.map((ruleGroup, index) => action.ruleGroupIndex === index ? Object.assign({}, ruleGroup, {Rules : newRules}) : ruleGroup);
}

export default function segmentBuilder(state = initialState, action) {

    let newRules = [];


    switch(action.type) {

        case REMOVE_RULE:

             newRules = buildNewRulesAfterRuleRemoval(state, action);

             return Object.assign({}, state, {RuleGroups : buildNewRuleGroups(state, action, newRules)});



        case SET_RULE_TYPE:

              newRules = buildNewRulesAfterUpdatingTheRuleType(state, action);

              return Object.assign({}, state, {RuleGroups : buildNewRuleGroups(state, action, newRules)});



        case SET_RULE_QUALIFIER:

              newRules = buildNewRulesAfterUpdatingTheRuleQualifier(state, action);

            let newRuleGroups1 = buildNewRuleGroups(state, action, newRules);
            //console.log('rule groups after updating rule qualifier', newRuleGroups1);
              return Object.assign({}, state, {RuleGroups : newRuleGroups1});



        case ADD_INITIAL_RULE_FOR_GROUP:

            newRules = buildNewRulesAfterInitialRuleAddition(state, action);

            return Object.assign({}, state, {RuleGroups : buildNewRuleGroups(state, action, newRules)});



        case ADD_RULE:

            newRules = buildNewRulesAfterRuleAddition(state, action);

            return Object.assign({}, state, {RuleGroups : buildNewRuleGroups(state, action, newRules)});



        case ADD_RULE_GROUP:

            let newRuleGroups = [
                ...state.RuleGroups,
                { Rules: [] }];

            return Object.assign({}, state, {RuleGroups: newRuleGroups});


        default:
            return state;
    }
}