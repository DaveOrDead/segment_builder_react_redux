import Button from '../components/Button'
import ConditionButton from '../components/ConditionButton'
import Dropdown from '../components/Dropdown'
import Textbox from '../components/Textbox'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'

class RuleBuilder extends Component {



    render() {

        const { rule, ruleTypes, ruleQualifiersForType, dispatch, actions } = this.props;

        console.log('rule type id:' + rule.ruleTypeId + '  rule qualifiter id:' + rule.ruleQualifierId)

        const valueControl = rule.ruleQualifierId && rule.ruleTypeId && rule.ruleTypeId !== 'default' ? ruleQualifiersForType[rule.ruleTypeId].filter(qualifier => qualifier.id === rule.ruleQualifierId)[0].valueControlType : null;

        let valueControlElement;

        if(valueControl){

            if(valueControl === 'textField') {
                valueControlElement = <Textbox value={rule.ruleCriteria} handleChange={(ruleCriteria) => actions.setRuleQualifier(rule.id, ruleCriteria.Id) } />;
                }
                else if (valueControl === 'vicinitySelector'){
                valueControlElement = <input type="search" placeholder="I am a search!!!" />;
                }
            }

console.log('Add or rules' + rule.disableAddOrRule );

        return (
            <section>

                <div>

                    <Dropdown items={ruleTypes} defaultValue={ruleTypes[0].id} selectedId={rule.ruleTypeId} handleSelectionChanged={ (ruleType) => actions.setRuleType(rule.id, ruleType.id) } />

                    <Dropdown items={ruleQualifiersForType[rule.ruleTypeId]} selectedId={rule.ruleQualifierId} isHidden={ !rule.ruleQualifierId } handleSelectionChanged={ (ruleQualifier) => actions.setRuleQualifier(rule.id, ruleQualifier.id) } />


                    { valueControlElement }

                    <Button text="Remove" handleClick={() => actions.removeRule(rule.id)} />

                    <ConditionButton text="Or" handleClick={() => actions.initOrRule()} isHidden={ !rule.ruleQualifierId } isDisabled={ rule.disableAddOrRule } />

                </div>

                <ConditionButton text="And" handleClick={() => actions.initAndRule(rule.ruleTypeId)} />

            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
