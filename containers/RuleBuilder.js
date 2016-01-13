import Button from '../components/Button'
import ConditionButton from '../components/ConditionButton'
import Dropdown from '../components/Dropdown'
import ValueControl from './ValueControl'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'


function mapStateToProps(state) {
    return {
        ruleTypes: state.ruleTypes,
        ruleQualifiersForType: state.ruleQualifiersForType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}


class RuleBuilder extends Component {

    render() {

        const { rule, ruleTypes, ruleQualifiersForType, actions } = this.props;
        
        return (

            <div className="rule-row">

                <Dropdown items={ruleTypes} defaultValue={ruleTypes[0].id} selectedId={rule.ruleTypeId} handleSelectionChanged={ (ruleType) => actions.setRuleType(rule.id, ruleType.id, 0) } />

                <Dropdown items={ruleQualifiersForType[rule.ruleTypeId]} selectedId={rule.ruleQualifierId} isHidden={ !rule.ruleQualifierId } handleSelectionChanged={ (ruleQualifier) => actions.setRuleQualifier(rule.id, ruleQualifier.id, 0) } />

                <ValueControl rule={rule} valueControlType={rule.ruleQualifierId ? ruleQualifiersForType[rule.ruleTypeId].filter(qualifier => qualifier.id === rule.ruleQualifierId)[0].valueControlType : null} />

                <Button text="Remove" handleClick={() => actions.removeRule(rule.id, rule.ruleGroupIndex)} />

                <ConditionButton text="Or" handleClick={() => actions.addRule(rule.ruleGroupIndex)} isHidden={ !rule.ruleQualifierId } isDisabled={ rule.disableAddOrRule } />

            </div>

        )
    }
}

RuleBuilder.propTypes = {
    rule: PropTypes.shape({
        ruleTypeId: PropTypes.string.isRequired,
        ruleQualifierId: PropTypes.string,
        ruleCriteria: PropTypes.any
    }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
