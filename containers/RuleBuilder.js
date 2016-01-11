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
        let element;

        if(valueControl){

            if(valueControl === 'textField') {
                element = <Textbox value={rule.ruleCriteria} handleChange={(ruleCriteria) => actions.setRuleQualifier(rule.id, ruleCriteria.Id) } />;
                }
                else if (valueControl === 'vicinitySelector'){
                element = <input type="search" placeholder="I am a search!!!" />;
                }
            }

console.log('Add or rules' + rule.disableAddOrRule );
        return (
            <section>

                <div>
                    <Dropdown items={ruleTypes} selectedId={rule.ruleTypeId} handleSelectionChanged={ (ruleType) => actions.setRuleType(rule.id, ruleType.id) } />

                    <Dropdown items={ruleQualifiersForType[rule.ruleTypeId]} selectedId={rule.ruleQualifierId} handleSelectionChanged={ (ruleQualifier) => actions.setRuleQualifier(rule.id, ruleQualifier.id) } />


                    { element }

                    <Button text="Remove" handleClick={() => actions.removeRule(rule.id)} />

                    <ConditionButton text="Or" handleClick={() => actions.addOrRule(rule.ruleTypeId)} isDisabled={ rule.disableAddOrRule } />

                </div>

                <ConditionButton text="And" handleClick={() => actions.addAndRule(rule.ruleTypeId)} />

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
